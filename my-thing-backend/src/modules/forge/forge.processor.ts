import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ForgeService } from './forge.service';

@Processor('transcription')
export class ForgeProcessor extends WorkerHost {
  private readonly logger = new Logger(ForgeProcessor.name);

  constructor(private readonly forgeService: ForgeService) {
    super();
  }

  async process(job: Job<{ recordingId: string; audioPath: string }>): Promise<any> {
    this.logger.log(`Processing transcription job #${job.id} for recording ${job.data.recordingId}`);
    return this.forgeService.processTranscriptionInBackground(
      job.data.recordingId,
      job.data.audioPath,
    );
  }
}
