import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { LensController } from './lens.controller';
import { LensService } from './lens.service';
import { LensProcessor } from './lens.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'script-validation',
    }),
  ],
  controllers: [LensController],
  providers: [LensService, LensProcessor],
  exports: [LensService],
})
export class LensModule {}
