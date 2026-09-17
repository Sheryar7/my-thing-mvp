import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CreateSourceDto } from './dto/create-source.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { GeminiService } from '../ai/gemini.service';
import { resolveProjectId, resolveSourceId } from '../../common/id-resolver';

@Injectable()
export class ArchiveService {
  private readonly logger = new Logger(ArchiveService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly geminiService: GeminiService,
    @InjectQueue('source-processing') private readonly sourceQueue: Queue,
  ) {}

  /**
   * Ingests a new research source and queues it for chunking, embedding, and claim extraction.
   */
  async createSource(dto: CreateSourceDto, userId: string) {
    const supabase = this.supabaseService.getClient();

    const { data: source, error } = await supabase
      .from('sources')
      .insert({
        project_id: dto.projectId,
        title: dto.title,
        url: dto.url || null,
        source_type: dto.sourceType,
        raw_content: dto.content,
        processing_status: 'pending',
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Error saving source to Supabase: ${error.message}`);
      throw new InternalServerErrorException('Failed to create source');
    }

    // Dispatch background job to BullMQ queue
    const job = await this.sourceQueue.add(
      'process-source',
      {
        sourceId: source.id,
        projectId: dto.projectId,
        content: dto.content,
      },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: true,
      },
    );

    return {
      success: true,
      message: 'Source created and queued for processing.',
      source,
      jobId: job.id,
    };
  }

  /**
   * List sources for a given project
   */
  async getSources(projectId: string) {
    const supabase = this.supabaseService.getClient();
    const resolvedProjectId = resolveProjectId(projectId);
    const { data, error } = await supabase
      .from('sources')
      .select('*')
      .eq('project_id', resolvedProjectId)
      .order('created_at', { ascending: true });

    if (error) {
      this.logger.error(`Failed to fetch sources: ${error.message}`);
      throw new InternalServerErrorException('Failed to retrieve sources');
    }

    return data || [];
  }

  /**
   * Get a single source with its chunks and claims
   */
  async getSourceById(sourceId: string) {
    const supabase = this.supabaseService.getClient();
    const resolvedSourceId = resolveSourceId(sourceId);
    const { data: source, error } = await supabase
      .from('sources')
      .select('*')
      .eq('id', resolvedSourceId)
      .single();

    if (error || !source) {
      throw new NotFoundException('Source not found');
    }

    const { data: claims } = await supabase
      .from('claims')
      .select('*')
      .eq('source_id', resolvedSourceId);

    const { data: chunks } = await supabase
      .from('source_chunks')
      .select('*')
      .eq('source_id', resolvedSourceId)
      .order('chunk_index', { ascending: true });

    const { data: project } = await supabase
      .from('projects')
      .select('id, title')
      .eq('id', source.project_id)
      .maybeSingle();

    return {
      ...source,
      projectTitle: project?.title || 'Educational Project',
      claims: claims || [],
      chunks: chunks || [],
    };
  }

  /**
   * Background processor logic: Chunks text, generates Gemini embeddings, and extracts claims
   */
  async processSourceInBackground(sourceId: string, projectId: string, content: string) {
    const supabase = this.supabaseService.getClient();
    this.logger.log(`Starting background processing for source ${sourceId}`);

    try {
      await supabase
        .from('sources')
        .update({ processing_status: 'processing' })
        .eq('id', sourceId);

      // 1. Text chunking (1000 characters with 200 character overlap)
      const chunkSize = 1000;
      const overlap = 200;
      const chunks: string[] = [];
      for (let i = 0; i < content.length; i += chunkSize - overlap) {
        chunks.push(content.substring(i, i + chunkSize));
      }

      // 2. Embed each chunk using Gemini text-embedding-004
      for (let idx = 0; idx < chunks.length; idx++) {
        const chunkText = chunks[idx];
        const embedding = await this.geminiService.embedText(chunkText, `source ${sourceId} chunk ${idx}`);

        await supabase.from('source_chunks').insert({
          source_id: sourceId,
          project_id: projectId,
          chunk_index: idx,
          content: chunkText,
          embedding: embedding,
          embedding_model: 'text-embedding-004',
        });
      }

      // 3. Extract factual claims
      const extractedClaims = await this.geminiService.extractClaims(content);
      if (extractedClaims.length > 0) {
        const claimsRecords = extractedClaims.map((claim) => ({
          source_id: sourceId,
          project_id: projectId,
          claim_text: claim,
          confidence_score: 1.0,
        }));

        await supabase.from('claims').insert(claimsRecords);
      }

      // 4. Mark status completed
      await supabase
        .from('sources')
        .update({
          processing_status: 'completed',
          summary: extractedClaims.slice(0, 3).join('; '),
        })
        .eq('id', sourceId);

      this.logger.log(`Successfully completed processing for source ${sourceId}`);
    } catch (err: any) {
      this.logger.error(`Error processing source ${sourceId}: ${err.message}`, err.stack);
      await supabase
        .from('sources')
        .update({ processing_status: 'failed' })
        .eq('id', sourceId);
      throw err;
    }
  }
}
