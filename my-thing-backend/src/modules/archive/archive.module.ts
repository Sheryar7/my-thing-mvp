import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ArchiveController } from './archive.controller';
import { ArchiveService } from './archive.service';
import { ArchiveProcessor } from './archive.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'source-processing',
    }),
  ],
  controllers: [ArchiveController],
  providers: [ArchiveService, ArchiveProcessor],
  exports: [ArchiveService],
})
export class ArchiveModule {}
