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
    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const host = configService.get<string>('REDIS_HOST');
    //     const port = configService.get<number>('REDIS_PORT');
    //     const password = configService.get<string>('REDIS_PASSWORD');

    //     // Debug log to terminal on startup
    //     console.log('🔍 [BullMQ Config Debug]:', {
    //       host,
    //       port,
    //       hasPassword: !!password,
    //     });

    //     return {
    //       connection: {
    //         host,
    //         port: Number(port) || 6379,
    //         password,
    //         tls: {},
    //         family: 4,
    //         connectTimeout: 10000,
    //         maxRetriesPerRequest: null,
    //       },
    //     };
    //   },
    // }),

    BullModule.forRoot({
      connection: {
        host: 'quick-racer-166343.upstash.io',
        port: 6379,
        password: 'gQAAAAAAAonHAAIgcDJkZWU5MjczNjBmZjA0NzE4ODZlYzY3ZjNiNzRlOWRjOQ', 
        tls: {},
        family: 4, // Force IPv4 (Prevents IPv6 resolution hangs on Windows)
        connectTimeout: 10000,
      },
    }),



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