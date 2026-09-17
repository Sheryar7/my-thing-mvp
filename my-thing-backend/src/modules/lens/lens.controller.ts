import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { LensService } from './lens.service';
import { ValidateScriptDto } from './dto/lens.dto';

@Controller('v1/lens')
export class LensController {
  constructor(private readonly lensService: LensService) {}

  @Post('validate')
  @HttpCode(HttpStatus.ACCEPTED)
  async validateScript(@Body() dto: ValidateScriptDto) {
    return this.lensService.triggerValidation(dto);
  }

  @Get('reports')
  async getReports(@Query('projectId') projectId?: string) {
    return this.lensService.getLatestReport(projectId);
  }

  @Get('reports/:id')
  async getReport(@Param('id') id: string) {
    return this.lensService.getReport(id);
  }
}
