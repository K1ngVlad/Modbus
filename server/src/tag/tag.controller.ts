import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagQueryDto } from './dto';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  getAll() {
    return this.tagService.getDevicesTagData();
  }

  @Get('chart-data')
  async getChartData(@Query() query: TagQueryDto) {
    return this.tagService.getChartData(query);
  }
}
