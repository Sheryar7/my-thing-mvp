import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './modules/ai/ai.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { ArchiveModule } from './modules/archive/archive.module';
import { WorkshopModule } from './modules/workshop/workshop.module';
import { ForgeModule } from './modules/forge/forge.module';
import { LensModule } from './modules/lens/lens.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RagModule } from './modules/rag/rag.module';

@Module({
  imports: [
    // 1. Global Config Module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // 2. Global BullMQ Redis Queue Configuration (Supporting both Docker and Remote Upstash)
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        let host = configService.get<string>('REDIS_HOST') || '127.0.0.1';
        // Strip out protocol prefixes if user passed http(s)://
        host = host.replace(/^https?:\/\//, '').replace(/\/$/, '');

        const port = Number(configService.get<number>('REDIS_PORT')) || 6379;
        const password = configService.get<string>('REDIS_PASSWORD');
        const isUpstash = host.includes('upstash.io');

        const connectionConfig: any = {
          host,
          port,
          family: 4,
          connectTimeout: 15000,
          maxRetriesPerRequest: null,
        };

        if (password) {
          connectionConfig.password = password;
        }
        if (isUpstash) {
          connectionConfig.tls = {};
        }

        return {
          connection: connectionConfig,
        };
      },
    }),

    // 3. Core Infrastructure
    AiModule,
    SupabaseModule,

    // 4. Four Core Functional Systems of "My Thing"
    ArchiveModule,
    WorkshopModule,
    ForgeModule,
    LensModule,
    ProjectsModule,

    // 5. Existing RAG Module
    RagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}