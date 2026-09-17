import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { RagController } from './rag.controller';
import { RagService } from './rag.service';
import { ChunkingService } from './services/chunking.service';
import { SupabaseProvider } from './providers/supabase.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { IngestionProcessor } from './processors/ingestion.processor';

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [




    // 2. Register Queue Name
    BullModule.registerQueue({
      name: 'document-ingestion',
    }),
  ],
  controllers: [RagController],
  providers: [
    RagService,
    ChunkingService,
    SupabaseProvider,
    GeminiProvider,
    IngestionProcessor, // Registered background worker
  ],
  exports: [RagService, ChunkingService],
})
export class RagModule { }