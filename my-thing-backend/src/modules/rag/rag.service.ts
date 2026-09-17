import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { QueryRagDto } from './dto/query-rag.dto';
import { IngestDocDto } from './dto/ingest-doc.dto';
import { SupabaseProvider } from './providers/supabase.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { ChunkingService } from './services/chunking.service';

interface DocumentChunkRecord {
  document_id: string;
  workspace_id: string;
  content: string;
  embedding: number[];
  embedding_model?: string;
}

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);

  constructor(
    private readonly supabaseProvider: SupabaseProvider,
    private readonly geminiProvider: GeminiProvider,
    private readonly chunkingService: ChunkingService,
  ) { }

  private extractEmbeddingVector(response: unknown): number[] | null {
    const embeddingResponse = response as {
      embedding?: { values?: unknown[] } | null;
      embeddings?: Array<{ values?: unknown[] } | null> | null;
    };

    const embedding = embeddingResponse.embedding ?? embeddingResponse.embeddings?.[0];
    const values = embedding?.values;

    if (!Array.isArray(values)) {
      return null;
    }

    const normalizedValues = values
      .map((value) => Number(value))
      .filter((value) => Number.isFinite(value));

    return normalizedValues.length > 0 ? normalizedValues : null;
  }

  private async embedTextWithFallback(
    text: string,
    context: string
  ): Promise<{ embeddingValues: number[]; model: string }> {
    const candidateModels = ['gemini-embedding-001', 'text-embedding-004', 'embedding-001'];

    for (const model of candidateModels) {
      try {
        const response = await this.geminiProvider.ai.models.embedContent({
          model,
          contents: text,
          config: {
            outputDimensionality: 768,
          },
        } as any);

        const embeddingValues = this.extractEmbeddingVector(response);

        if (embeddingValues && embeddingValues.length > 0) {
          this.logger.log(`Generated embedding with model ${model} for ${context}.`);
          return { embeddingValues, model };
        }

        this.logger.warn(`Embedding model ${model} returned no values for ${context}.`);
      } catch (error: any) {
        const message = error?.message || String(error);
        const isModelIssue = /not found|unsupported|404|invalid model|model .* not/i.test(message);

        if (isModelIssue) {
          this.logger.warn(`Embedding model ${model} failed for ${context}: ${message}`);
          continue;
        }

        this.logger.error(`Embedding request failed for ${context} with model ${model}: ${message}`, error?.stack);
        throw error;
      }
    }

    throw new Error(`Unable to generate embeddings for ${context} using supported models.`);
  }

  /**
   * Ingests a document: chunks text, generates embeddings, and saves to Supabase (pgvector).
   */
  async handleIngest(ingestDto: IngestDocDto) {
    const { workspaceId, documentId, content } = ingestDto;
    this.logger.log(`Ingesting document ${documentId} in workspace: ${workspaceId}`);

    try {
      const chunks = await this.chunkingService.splitText(content);
      const recordsToInsert: DocumentChunkRecord[] = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunkText = chunks[i];
        const { embeddingValues, model } = await this.embedTextWithFallback(
          chunkText,
          `ingestion chunk ${i} for document ${documentId}`,
        );

        recordsToInsert.push({
          document_id: documentId,
          workspace_id: workspaceId,
          content: chunkText,
          embedding: embeddingValues,
          embedding_model: model,
        });
      }

      const { error } = await this.supabaseProvider.client
        .from('document_chunks')
        .insert(recordsToInsert);

      if (error) {
        this.logger.error(`Supabase insert error: ${error.message}`);
        throw new InternalServerErrorException('Failed to store document chunks');
      }

      this.logger.log(`Successfully ingested ${recordsToInsert.length} chunks into vector DB.`);

      return {
        success: true,
        message: `Successfully ingested ${recordsToInsert.length} chunks for document ${documentId}`,
        totalChunks: recordsToInsert.length,
      };
    } catch (err: any) {
      this.logger.error(`Error during ingestion: ${err.message}`, err.stack);
      throw new InternalServerErrorException(err.message || 'Ingestion failed');
    }
  }

  /**
   * Queries RAG system: embeds input question, retrieves matching chunks, and calls LLM.
   */
  async handleQuery(queryDto: QueryRagDto) {
    const { question, workspaceId, documentIds } = queryDto;
    this.logger.log(`Processing RAG query for workspace: ${workspaceId}`);

    try {
      const { embeddingValues } = await this.embedTextWithFallback(
        question,
        `query for workspace ${workspaceId}`,
      );

      const rpcPayload: Record<string, unknown> = {
        query_embedding: embeddingValues,
        match_threshold: 0.3,
        match_count: 5,
        filter_workspace_id: workspaceId,
      };

      if (documentIds && documentIds.length > 0) {
        rpcPayload.filter_document_ids = documentIds;
        this.logger.log(`Filtering RPC search to specific document IDs: ${documentIds.join(', ')}`);
      }

      let matchedChunks: any[] = [];
      try {
        const { data, error: rpcError } = await this.supabaseProvider.client.rpc(
          'match_document_chunks',
          rpcPayload,
        );
        if (!rpcError && Array.isArray(data)) {
          matchedChunks = data;
        }
      } catch (rpcErr: any) {
        this.logger.warn(`Supabase RPC match unavailable, using demo research context: ${rpcErr?.message}`);
      }

      // Educational Creator Research Library for the 5 Demo Projects
      const demoKnowledgeBase: Record<string, string[]> = {
        'black-holes': [
          'The Event Horizon Telescope (EHT) captured the first image of the M87* supermassive black hole, confirming general relativity predictions of an asymmetric photon ring around the shadow.',
          'An event horizon is the mathematical boundary beyond which escape velocity exceeds the speed of light in vacuum (c = 299,792 km/s).',
          'Stephen Hawking in 1974 predicted that quantum particle-antiparticle pairs near the horizon cause black holes to emit thermal radiation and slowly evaporate.',
          'Gravitational tidal forces cause extreme differential stretching, famously described as spaghettification, before an object crosses the Schwarzschild radius.',
        ],
        'ai-healthcare': [
          'Obermeyer et al. (Science 2019) demonstrated commercial triage algorithms showed systemic racial bias by utilizing past healthcare expenditure as an erroneous proxy for actual patient illness severity.',
          'Deep learning radiology and dermatology models frequently suffer from domain shift when deployed in clinical environments differing from training demographic distributions.',
          'The World Health Organization (WHO) 2021 Ethics and Governance Guidance mandates explainability, data privacy, and human-in-the-loop validation for clinical AI.',
        ],
        'roman-republic': [
          'In January 49 BCE, Julius Caesar defied the Roman Senate by leading the 13th Legion (Legio XIII Gemina) across the Rubicon river, uttering "Alea iacta est" (The die is cast).',
          'The expansion of the Roman Empire created vast slave-operated agricultural estates (latifundia), dispossessing the plebeian smallholder farmers who formed the traditional backbone of the Republic.',
          'Cicero vigorously defended constitutional republican norms in his Philippics against Mark Antony, advocating for the concordia ordinum (harmony between social orders).',
        ],
        'crispr-genetics': [
          'Jennifer Doudna and Emmanuelle Charpentier earned the 2020 Nobel Prize for demonstrating that the bacterial Cas9 enzyme could be programmed with single-guide RNA (sgRNA) for targeted genomic double-strand breaks.',
          'Casgevy (exa-cel) gained historic FDA approval in December 2023 as the first commercial CRISPR therapy, targeting the BCL11A erythroid enhancer to reactivate fetal hemoglobin in sickle cell patients.',
          'Modern prime editing and base editing systems permit precise single-nucleotide alterations without introducing hazardous double-stranded DNA breaks.',
        ],
        'habit-psychology': [
          'Ann Graybiel\'s MIT laboratory uncovered that habit execution is encoded in the basal ganglia (specifically the dorsolateral striatum) as chunked behavioral action brackets.',
          'Wolfram Schultz discovered that midbrain dopaminergic neurons compute Reward Prediction Errors (RPE)—surging when outcomes exceed expectations and dampening when expected rewards fail.',
          'Behavioral design protocols emphasize reducing the "friction of the cue" to facilitate basal ganglia automaticity before conscious prefrontal resistance occurs.',
        ],
      };

      const lowerQ = question.toLowerCase();
      const lowerW = (workspaceId || '').toLowerCase();
      let matchedDemoContext: string[] = [];

      if (lowerW.includes('black-hole') || lowerW.includes('physics') || lowerW === 'bbbbbbbb-0000-0000-0000-000000000001' || lowerQ.includes('black hole') || lowerQ.includes('spacetime') || lowerQ.includes('singularity') || lowerQ.includes('hawking') || lowerQ.includes('event horizon')) {
        matchedDemoContext = demoKnowledgeBase['black-holes'];
      } else if (lowerW.includes('health') || lowerW.includes('ai-ethics') || lowerW === 'bbbbbbbb-0000-0000-0000-000000000002' || lowerQ.includes('health') || lowerQ.includes('medicine') || lowerQ.includes('bias') || lowerQ.includes('hospital') || lowerQ.includes('clinical')) {
        matchedDemoContext = demoKnowledgeBase['ai-healthcare'];
      } else if (lowerW.includes('rome') || lowerW.includes('republic') || lowerW === 'bbbbbbbb-0000-0000-0000-000000000003' || lowerQ.includes('rome') || lowerQ.includes('caesar') || lowerQ.includes('republic') || lowerQ.includes('rubicon') || lowerQ.includes('cicero')) {
        matchedDemoContext = demoKnowledgeBase['roman-republic'];
      } else if (lowerW.includes('crispr') || lowerW.includes('gene') || lowerW === 'bbbbbbbb-0000-0000-0000-000000000004' || lowerQ.includes('crispr') || lowerQ.includes('gene') || lowerQ.includes('dna') || lowerQ.includes('cas9') || lowerQ.includes('genetics')) {
        matchedDemoContext = demoKnowledgeBase['crispr-genetics'];
      } else if (lowerW.includes('habit') || lowerW.includes('dopamine') || lowerW === 'bbbbbbbb-0000-0000-0000-000000000005' || lowerQ.includes('habit') || lowerQ.includes('dopamine') || lowerQ.includes('routine') || lowerQ.includes('psychology') || lowerQ.includes('brain')) {
        matchedDemoContext = demoKnowledgeBase['habit-psychology'];
      }

      let combinedContext = '';
      if (queryDto.currentScript) {
        combinedContext += `[Current Project Teleprompter Script]\n${queryDto.currentScript}\n\n`;
      }
      if (matchedChunks.length > 0) {
        combinedContext += (combinedContext ? '---\n\n' : '') + matchedChunks.map((c: any) => `[Document: ${c.document_id ?? 'unknown'}]\n${c.content}`).join('\n\n---\n\n');
      }
      if (matchedDemoContext.length > 0) {
        combinedContext += (combinedContext ? '\n\n---\n\n' : '') + matchedDemoContext.map((c, i) => `[Research Source Evidence #${i + 1}]\n${c}`).join('\n\n');
      }

      const contextText = combinedContext || 'General knowledge and creative documentary direction.';

      const prompt = `You are an expert scriptwriting and research assistant for educational video creators (like Vox, Kurzgesagt, or Veritasium).

Research Evidence from Project Archive:
${contextText}

Creator Request:
${question}

Instructions:
1. Actively incorporate and cite the scientific, historical, or technological facts from the research evidence above whenever relevant.
2. Produce a compelling, engaging, and professional response written specifically for an educational creator's script or outline.
3. CLEAN TEXT ONLY: Do NOT use markdown symbols like '###', '##', '---', or '*'. Write headings on their own clean line in title case. Write speaker lines as 'HOST: ...'. Write audio cues as '(Audio Cue: ...)'. Ensure the script is clean, professional, and ready to read without raw formatting tags.`;

      const textModels = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-2.0-flash'];
      let generateResponse: any = null;
      let usedModel = '';

      for (const model of textModels) {
        try {
          generateResponse = await this.geminiProvider.ai.models.generateContent({
            model,
            contents: prompt,
          });
          usedModel = model;
          break;
        } catch (err: any) {
          const message = err?.message || String(err);
          const isModelIssue = /not found|unsupported|404|invalid model|model .* not|no longer available/i.test(message);
          const isTemporary =
            err?.status === 'RESOURCE_EXHAUSTED' ||
            err?.status === 'UNAVAILABLE' ||
            message.includes('429') ||
            message.includes('503') ||
            message.includes('high demand') ||
            message.includes('overloaded');

          if (isTemporary || isModelIssue) {
            this.logger.warn(`Model ${model} unavailable (${message}). Trying next candidate...`);
            continue;
          }
          throw err;
        }
      }

      if (!generateResponse) {
        throw new InternalServerErrorException('All candidate text models failed or hit quota limits.');
      }

      const rawAnswer = generateResponse.text || 'No answer generated.';
      // Clean up raw markdown syntax (###, ---, **, *) so output is clean and human-readable
      const cleanAnswer = rawAnswer
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^-{3,}\s*$/gm, '')
        .replace(/^\*\s+/gm, '• ')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      return {
        success: true,
        answer: cleanAnswer,
        workspaceId,
        modelUsed: usedModel,
        documentsUsed: documentIds || [],
        chunksRetrieved: matchedChunks?.length || 0,
      };
    } catch (err: any) {
      this.logger.error(`Error during RAG query processing: ${err.message}`, err.stack);
      throw new InternalServerErrorException(err.message || 'RAG query failed');
    }
  }
}