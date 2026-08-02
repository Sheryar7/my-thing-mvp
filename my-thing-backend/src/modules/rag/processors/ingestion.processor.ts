import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { RagService } from '../rag.service';
import { IngestDocDto } from '../dto/ingest-doc.dto';

@Processor('document-ingestion')
export class IngestionProcessor extends WorkerHost {
  private readonly logger = new Logger(IngestionProcessor.name);

  constructor(private readonly ragService: RagService) {
    super();
  }

  async process(job: Job<IngestDocDto, any, string>): Promise<any> {
    this.logger.log(`Starting background ingestion job #${job.id} for document: ${job.data.documentId}`);

    try {
      // Execute the ingestion logic defined in RagService
      const result = await this.ragService.handleIngest(job.data);
      
      this.logger.log(`Completed background ingestion job #${job.id} successfully.`);
      return result;
    } catch (error: any) {
      this.logger.error(`Failed background ingestion job #${job.id}: ${error.message}`, error.stack);
      throw error;
    }
  }
}