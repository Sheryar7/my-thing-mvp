import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { GeminiService } from '../ai/gemini.service';
import { GenerateOutlineDto, GenerateScriptDto, UpdateScriptDto } from './dto/workshop.dto';
import { resolveProjectId, resolveScriptId } from '../../common/id-resolver';

@Injectable()
export class WorkshopService {
  private readonly logger = new Logger(WorkshopService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly geminiService: GeminiService,
  ) {}

  /**
   * Generates a narrative outline based on stored project research chunks
   */
  async generateOutline(dto: GenerateOutlineDto) {
    const supabase = this.supabaseService.getClient();

    // 1. Fetch recent source chunks for context
    const { data: chunks, error: chunksError } = await supabase
      .from('source_chunks')
      .select('content')
      .eq('project_id', dto.projectId)
      .limit(10);

    const contextChunks = chunks ? chunks.map((c) => c.content) : [];

    // 2. Call Gemini for structured outline
    const outlineStructure = await this.geminiService.generateOutline(
      dto.topic,
      contextChunks,
    );

    // 3. Save to database
    const { data: outline, error } = await supabase
      .from('outlines')
      .insert({
        project_id: dto.projectId,
        title: outlineStructure.title || dto.topic,
        structure: outlineStructure,
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to save outline: ${error.message}`);
      throw new InternalServerErrorException('Failed to save outline');
    }

    return {
      success: true,
      outline,
    };
  }

  /**
   * Generates an educational script anchored to source citations
   */
  async generateScript(dto: GenerateScriptDto) {
    const supabase = this.supabaseService.getClient();

    // 1. Fetch the outline
    const { data: outline, error: outlineError } = await supabase
      .from('outlines')
      .select('*')
      .eq('id', dto.outlineId)
      .single();

    if (outlineError || !outline) {
      throw new NotFoundException('Outline not found');
    }

    // 2. Fetch source chunks with IDs for inline citation anchoring
    const { data: chunks } = await supabase
      .from('source_chunks')
      .select('id, content')
      .eq('project_id', dto.projectId)
      .limit(15);

    const outlineSummary = JSON.stringify(outline.structure, null, 2);

    // 3. Generate script using Gemini
    const scriptContent = await this.geminiService.generateScript(
      outlineSummary,
      chunks || [],
    );

    const wordCount = scriptContent.split(/\s+/).filter(Boolean).length;
    const estimatedReadTimeSeconds = Math.round((wordCount / 140) * 60); // standard ~140 words/min speech rate

    // 4. Save script to database
    const { data: script, error } = await supabase
      .from('scripts')
      .insert({
        project_id: dto.projectId,
        outline_id: dto.outlineId,
        title: dto.title || outline.title || 'Untitled Script',
        content: scriptContent,
        word_count: wordCount,
        estimated_read_time_seconds: estimatedReadTimeSeconds,
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to save script: ${error.message}`);
      throw new InternalServerErrorException('Failed to save script');
    }

    return {
      success: true,
      script,
    };
  }

  /**
   * Get script by ID
   */
  async getScript(scriptId: string) {
    const supabase = this.supabaseService.getClient();
    const resolvedScriptId = resolveScriptId(scriptId);
    const { data: script, error } = await supabase
      .from('scripts')
      .select('*')
      .eq('id', resolvedScriptId)
      .single();

    if (error || !script) {
      throw new NotFoundException('Script not found');
    }

    return script;
  }

  /**
   * Update script content
   */
  async updateScript(scriptId: string, dto: UpdateScriptDto) {
    const supabase = this.supabaseService.getClient();
    const wordCount = dto.content.split(/\s+/).filter(Boolean).length;
    const estimatedReadTimeSeconds = Math.round((wordCount / 140) * 60);

    const updatePayload: any = {
      content: dto.content,
      word_count: wordCount,
      estimated_read_time_seconds: estimatedReadTimeSeconds,
      updated_at: new Date().toISOString(),
    };

    if (dto.title) {
      updatePayload.title = dto.title;
    }

    const { data: script, error } = await supabase
      .from('scripts')
      .update(updatePayload)
      .eq('id', scriptId)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException('Failed to update script');
    }

    return {
      success: true,
      script,
    };
  }

  /**
   * List outlines for project
   */
  async getOutlines(projectId: string) {
    const supabase = this.supabaseService.getClient();
    const resolvedProjectId = resolveProjectId(projectId);
    const { data, error } = await supabase
      .from('outlines')
      .select('*')
      .eq('project_id', resolvedProjectId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException('Failed to retrieve outlines');
    }

    return data || [];
  }

  /**
   * List scripts, optionally filtered by project
   */
  async getScripts(projectId?: string) {
    const supabase = this.supabaseService.getClient();
    let query = supabase
      .from('scripts')
      .select('*')
      .order('created_at', { ascending: false });

    if (projectId) {
      const resolvedProjectId = resolveProjectId(projectId);
      query = query.eq('project_id', resolvedProjectId);
    }

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException('Failed to retrieve scripts');
    }

    return data || [];
  }
}
