import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ForgeService } from './forge.service';
import { UploadRecordingDto, TeleprompterProgressDto } from './dto/forge.dto';

@Controller('v1/forge')
export class ForgeController {
  constructor(private readonly forgeService: ForgeService) {}

  @Post('recordings/upload')
  @HttpCode(HttpStatus.ACCEPTED)
  async registerRecording(@Body() dto: UploadRecordingDto) {
    return this.forgeService.registerRecording(dto);
  }

  @Get('teleprompter/:scriptId')
  async getTeleprompterBlocks(@Param('scriptId') scriptId: string) {
    return this.forgeService.getTeleprompterBlocks(scriptId);
  }

  @Put('teleprompter/:scriptId/progress')
  async updateProgress(
    @Param('scriptId') scriptId: string,
    @Body() progress: TeleprompterProgressDto,
  ) {
    return this.forgeService.updateProgress(scriptId, progress);
  }
}
