import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SupabaseService } from '../supabase/supabase.service';
import { GeminiService } from '../ai/gemini.service';
import { UploadRecordingDto, TeleprompterProgressDto } from './dto/forge.dto';
import { resolveScriptId } from '../../common/id-resolver';

@Injectable()
export class ForgeService {
  private readonly logger = new Logger(ForgeService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly geminiService: GeminiService,
    @InjectQueue('transcription') private readonly transcriptionQueue: Queue,
  ) {}

  /**
   * Save recording metadata and queue transcription
   */
  async registerRecording(dto: UploadRecordingDto) {
    const supabase = this.supabaseService.getClient();

    const { data: recording, error } = await supabase
      .from('recordings')
      .insert({
        project_id: dto.projectId,
        script_id: dto.scriptId || null,
        audio_storage_path: dto.audioStoragePath,
        duration_seconds: dto.durationSeconds || 0,
        status: 'uploaded',
      })
      .select()
      .single();

    if (error) {
      this.logger.error(`Failed to register recording: ${error.message}`);
      throw new InternalServerErrorException('Failed to register recording');
    }

    const job = await this.transcriptionQueue.add(
      'transcribe-audio',
      {
        recordingId: recording.id,
        audioPath: dto.audioStoragePath,
      },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 3000 },
        removeOnComplete: true,
      },
    );

    return {
      success: true,
      recording,
      jobId: job.id,
    };
  }

  /**
   * Transform a script into structured teleprompter blocks with timing metrics
   */
  async getTeleprompterBlocks(scriptId: string) {
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

    // Split script paragraphs into bite-sized teleprompter blocks
    const paragraphs = script.content
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    let cumulativeTime = 0;
    const blocks = paragraphs.map((text, index) => {
      const words = text.split(/\s+/).filter(Boolean).length;
      const estimatedDurationSeconds = Math.max(2, Math.round((words / 140) * 60));
      const startTime = cumulativeTime;
      cumulativeTime += estimatedDurationSeconds;

      return {
        blockIndex: index,
        text,
        wordCount: words,
        startTimeSeconds: startTime,
        durationSeconds: estimatedDurationSeconds,
      };
    });

    return {
      scriptId: script.id,
      title: script.title,
      totalDurationSeconds: cumulativeTime,
      totalBlocks: blocks.length,
      blocks,
    };
  }

  /**
   * Track live teleprompter reading progress
   */
  async updateProgress(scriptId: string, progress: TeleprompterProgressDto) {
    return {
      success: true,
      scriptId,
      ...progress,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Background processor: Audio transcription worker
   */
  async processTranscriptionInBackground(recordingId: string, audioPath: string) {
    const supabase = this.supabaseService.getClient();
    this.logger.log(`Starting transcription job for recording: ${recordingId}`);

    await supabase
      .from('recordings')
      .update({ status: 'transcribing' })
      .eq('id', recordingId);

    try {
      // In production, invoke Whisper API or Gemini Multimodal Audio transcription
      // Placeholder transcript generation
      const mockTranscript = `Transcribed audio from ${audioPath}. Educational overview complete.`;

      await supabase
        .from('recordings')
        .update({
          status: 'completed',
          transcript: mockTranscript,
        })
        .eq('id', recordingId);

      this.logger.log(`Transcription completed for recording: ${recordingId}`);
    } catch (err: any) {
      this.logger.error(`Transcription failed for ${recordingId}: ${err.message}`, err.stack);
      await supabase
        .from('recordings')
        .update({ status: 'failed' })
        .eq('id', recordingId);
      throw err;
    }
  }
}
