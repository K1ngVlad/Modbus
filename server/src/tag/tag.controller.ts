import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagQueryDto } from './dto';
import { TagQueryRequest } from './dto/tag-query.dto';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get()
  getAll() {
    return this.tagService.getDevicesTagData();
  }

  @Get('chart-data')
  async getChartData(@Query() query: TagQueryRequest) {
    const dto: TagQueryDto = {
      ...query,
      tagNames: query.tagNames.split(',').map((item) => item.trim()),
      deviceNames: query.deviceNames.split(',').map((item) => item.trim()),
    };

    return this.tagService.getChartData(dto);
  }
}
