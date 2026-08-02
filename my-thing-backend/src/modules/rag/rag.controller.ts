import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RagService } from './rag.service';
import { QueryRagDto } from './dto/query-rag.dto';
import { IngestDocDto } from './dto/ingest-doc.dto';

@Controller('v1/rag')
export class RagController {
  constructor(
    private readonly ragService: RagService,
    @InjectQueue('document-ingestion') private readonly ingestionQueue: Queue,
  ) {}

  @Post('query')
  @HttpCode(HttpStatus.OK)
  async query(@Body() queryDto: QueryRagDto) {
    return this.ragService.handleQuery(queryDto);
  }

  @Post('ingest')
  @HttpCode(HttpStatus.ACCEPTED)
  async ingest(@Body() ingestDto: IngestDocDto) {
    // Add job to BullMQ queue for async processing
    const job = await this.ingestionQueue.add('process-document', ingestDto, {
      attempts: 3, // Retry up to 3 times on failure
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
      removeOnComplete: true,
    });

    return {
      success: true,
      message: 'Document processing queued successfully.',
      jobId: job.id,
      documentId: ingestDto.documentId,
    };
  }
}