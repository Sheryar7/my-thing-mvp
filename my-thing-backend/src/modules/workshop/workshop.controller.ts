import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { GenerateOutlineDto, GenerateScriptDto, UpdateScriptDto } from './dto/workshop.dto';

@Controller('v1/workshop')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post('outlines/generate')
  @HttpCode(HttpStatus.OK)
  async generateOutline(@Body() dto: GenerateOutlineDto) {
    return this.workshopService.generateOutline(dto);
  }

  @Get('outlines')
  async getOutlines(@Query('projectId') projectId: string) {
    return this.workshopService.getOutlines(projectId);
  }

  @Post('scripts/generate')
  @HttpCode(HttpStatus.OK)
  async generateScript(@Body() dto: GenerateScriptDto) {
    return this.workshopService.generateScript(dto);
  }

  @Get('scripts')
  async getScripts(@Query('projectId') projectId?: string) {
    return this.workshopService.getScripts(projectId);
  }

  @Get('scripts/:id')
  async getScript(@Param('id') id: string) {
    return this.workshopService.getScript(id);
  }

  @Put('scripts/:id')
  async updateScript(@Param('id') id: string, @Body() dto: UpdateScriptDto) {
    return this.workshopService.updateScript(id, dto);
  }
}
