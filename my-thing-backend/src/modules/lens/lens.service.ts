import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SupabaseService } from '../supabase/supabase.service';
import { GeminiService } from '../ai/gemini.service';
import { ValidateScriptDto } from './dto/lens.dto';
import { resolveReportId, resolveProjectId } from '../../common/id-resolver';

@Injectable()
export class LensService {
  private readonly logger = new Logger(LensService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly geminiService: GeminiService,
    @InjectQueue('script-validation') private readonly validationQueue: Queue,
  ) {}

  /**
   * Queue a script for deep factual validation against research sources
   */
  async triggerValidation(dto: ValidateScriptDto) {
    const supabase = this.supabaseService.getClient();

    // 1. Create a pending validation report record
    const { data: report, error } = await supabase
      .from('validation_reports')
      .insert({
        project_id: dto.projectId,
        script_id: dto.scriptId,
        recording_id: dto.recordingId || null,
        coverage_score: 0,
        verified_claims: [],
        unsupported_claims: [],
        missing_topics: [],
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to create validation report: ${error.message}`);
      throw new InternalServerErrorException('Failed to initiate validation');
    }

    // 2. Dispatch job to BullMQ queue
    const job = await this.validationQueue.add(
      'run-validation',
      {
        reportId: report.id,
        projectId: dto.projectId,
        scriptId: dto.scriptId,
        recordingId: dto.recordingId,
      },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 3000 },
        removeOnComplete: true,
      },
    );

    return {
      success: true,
      message: 'Validation job enqueued successfully.',
      reportId: report.id,
      jobId: job.id,
    };
  }

  async getReport(reportId: string) {
    const supabase = this.supabaseService.getClient();
    const resolvedReportId = resolveReportId(reportId);

    const { data: report, error } = await supabase
      .from('validation_reports')
      .select('*')
      .eq('id', resolvedReportId)
      .single();

    if (error || !report) {
      throw new NotFoundException('Validation report not found');
    }

    return report;
  }

  /**
   * Retrieve latest validation report, optionally filtered by project
   */
  async getLatestReport(projectId?: string) {
    const supabase = this.supabaseService.getClient();
    let query = supabase
      .from('validation_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (projectId) {
      const resolvedProjectId = resolveProjectId(projectId);
      query = query.eq('project_id', resolvedProjectId);
    }

    const { data: reports } = await query.limit(1);
    if (!reports || reports.length === 0) {
      return this.getReport('11111111-0000-0000-0000-000000000001');
    }
    return reports[0];
  }

  /**
   * Background processor: Cross-references script with sources using Gemini Pro
   */
  async processValidationInBackground(
    reportId: string,
    projectId: string,
    scriptId: string,
    recordingId?: string,
  ) {
    const supabase = this.supabaseService.getClient();
    this.logger.log(`Starting validation for report: ${reportId}`);

    try {
      // 1. Fetch script
      const { data: script } = await supabase
        .from('scripts')
        .select('content')
        .eq('id', scriptId)
        .single();

      // 2. Fetch source chunks
      const { data: chunks } = await supabase
        .from('source_chunks')
        .select('content')
        .eq('project_id', projectId)
        .limit(20);

      const sourcesText = chunks ? chunks.map((c) => c.content).join('\n---\n') : '';

      // 3. Fetch transcript if recording exists
      let transcriptText = '';
      if (recordingId) {
        const { data: recording } = await supabase
          .from('recordings')
          .select('transcript')
          .eq('id', recordingId)
          .single();
        transcriptText = recording?.transcript || '';
      }

      // 4. Run Gemini validation analysis
      const analysis = await this.geminiService.validateScript(
        script?.content || '',
        sourcesText,
        transcriptText,
      );

      // 5. Update validation report
      await supabase
        .from('validation_reports')
        .update({
          coverage_score: analysis.coverage_score || 0,
          verified_claims: analysis.verified_claims || [],
          unsupported_claims: analysis.unsupported_claims || [],
          missing_topics: analysis.missing_topics || [],
        })
        .eq('id', reportId);

      this.logger.log(`Successfully completed validation report: ${reportId}`);
    } catch (err: any) {
      this.logger.error(`Validation failed for report ${reportId}: ${err.message}`, err.stack);
      throw err;
    }
  }
}
