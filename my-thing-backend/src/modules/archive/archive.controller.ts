import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { CreateSourceDto } from './dto/create-source.dto';
import { CurrentUser } from '../../common/decorators/user.decorator';

@Controller('v1/archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Post('sources')
  @HttpCode(HttpStatus.ACCEPTED)
  async createSource(
    @Body() createSourceDto: CreateSourceDto,
    @CurrentUser() userId: string,
  ) {
    return this.archiveService.createSource(createSourceDto, userId);
  }

  @Get('sources')
  async getSources(@Query('projectId') projectId: string) {
    return this.archiveService.getSources(projectId);
  }

  @Get('sources/:id')
  async getSourceById(@Param('id') id: string) {
    return this.archiveService.getSourceById(id);
  }
}
