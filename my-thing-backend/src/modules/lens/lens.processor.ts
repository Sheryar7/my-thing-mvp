import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { LensService } from './lens.service';

@Processor('script-validation')
export class LensProcessor extends WorkerHost {
  private readonly logger = new Logger(LensProcessor.name);

  constructor(private readonly lensService: LensService) {
    super();
  }

  async process(job: Job<{ reportId: string; projectId: string; scriptId: string; recordingId?: string }>): Promise<any> {
    this.logger.log(`Processing validation job #${job.id} for report ${job.data.reportId}`);
    return this.lensService.processValidationInBackground(
      job.data.reportId,
      job.data.projectId,
      job.data.scriptId,
      job.data.recordingId,
    );
  }
}
