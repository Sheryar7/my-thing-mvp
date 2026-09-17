import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ForgeController } from './forge.controller';
import { ForgeService } from './forge.service';
import { ForgeProcessor } from './forge.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'transcription',
    }),
  ],
  controllers: [ForgeController],
  providers: [ForgeService, ForgeProcessor],
  exports: [ForgeService],
})
export class ForgeModule {}
