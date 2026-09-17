import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ArchiveService } from './archive.service';

@Processor('source-processing')
export class ArchiveProcessor extends WorkerHost {
  private readonly logger = new Logger(ArchiveProcessor.name);

  constructor(private readonly archiveService: ArchiveService) {
    super();
  }

  async process(job: Job<{ sourceId: string; projectId: string; content: string }>): Promise<any> {
    this.logger.log(`Received job ${job.id} to process source ${job.data.sourceId}`);
    return this.archiveService.processSourceInBackground(
      job.data.sourceId,
      job.data.projectId,
      job.data.content,
    );
  }
}
