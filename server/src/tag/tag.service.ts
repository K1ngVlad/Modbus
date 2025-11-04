import { Injectable } from '@nestjs/common';
import { Tag } from './tag.model';
import { InjectModel } from '@nestjs/sequelize';
import { TagQueryDto, WriteTagDto } from './dto';
import { Op } from 'sequelize';

interface TagDataPoint {
  value: number;
  createdAt: string;
}

interface TagInfo {
  name: string;
  unit: string;
  data: TagDataPoint[];
}

export interface DevicesTagData {
  deviceName: string;
  tags: TagInfo[];
}

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  async writeTag(dto: WriteTagDto): Promise<Tag> {
    const tag = await this.tagRepository.create(dto);
    return tag;
  }

  async getDevicesTagData(): Promise<DevicesTagData[]> {
    // Получаем все теги с сортировкой по deviceName и createdAt
    const tags = await this.tagRepository.findAll({
      //   where: {
      //     createdAt: {
      //       [Op.gte]: 10, //
      //     },
      //   },
      order: [
        ['deviceName', 'ASC'],
        ['name', 'ASC'],
        ['createdAt', 'ASC'],
      ],
      limit: 1000,
    });

    // Группируем данные
    const devicesMap = new Map<string, Map<string, TagDataPoint[]>>();

    tags.forEach((tag) => {
      const { deviceName, name, unit, value, createdAt } = tag;

      // Если устройства еще нет в мапе - создаем
      if (!devicesMap.has(deviceName)) {
        devicesMap.set(deviceName, new Map());
      }

      const deviceTags = devicesMap.get(deviceName)!;

      // Если тега еще нет - создаем массив данных
      if (!deviceTags.has(name)) {
        deviceTags.set(name, []);
      }

      // Добавляем точку данных
      deviceTags.get(name)!.push({
        value,
        createdAt: createdAt.toISOString(),
      });
    });

    // Преобразуем в требуемый формат
    const result: DevicesTagData[] = [];

    devicesMap.forEach((tagsMap, deviceName) => {
      const tags: TagInfo[] = [];

      tagsMap.forEach((dataPoints, name) => {
        // Берем unit из первого элемента (предполагаем, что unit одинаков для одного тега)
        const unit =
          tags.find((t) => t.name === name)?.unit ||
          tags.find((t) => t.name === name && t.data.length > 0)?.unit ||
          '';

        tags.push({
          name,
          unit,
          data: dataPoints,
        });
      });

      result.push({
        deviceName,
        tags,
      });
    });

    return result;
  }

  async getChartData(query: TagQueryDto) {
    const { tagNames, deviceNames, startDate, endDate, limit = 500 } = query;

    const where: any = {};

    if (tagNames && tagNames.length > 0) {
      where.name = { [Op.in]: tagNames };
    }

    if (deviceNames && deviceNames.length > 0) {
      where.deviceName = { [Op.in]: deviceNames };
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt[Op.gte] = startDate;
      if (endDate) where.createdAt[Op.lte] = endDate;
    }

    const tags = await this.tagRepository.findAll({
      where,
      order: [['createdAt', 'ASC']],
      limit: limit > 1000 ? 1000 : limit, // Защита от слишком больших запросов
    });

    return this.formatForChart(tags);
  }

  private formatForChart(tags: Tag[]) {
    // Группируем по времени для AreaChart
    const timeMap = new Map<string, any>();

    tags.forEach((tag) => {
      const timeKey = tag.createdAt.toISOString();

      if (!timeMap.has(timeKey)) {
        timeMap.set(timeKey, {
          timestamp: timeKey,
          datetime: tag.createdAt.toLocaleString('ru-RU'),
        });
      }

      const dataPoint = timeMap.get(timeKey);
      const seriesKey = `${tag.deviceName}-${tag.name}`;
      dataPoint[seriesKey] = tag.value;
      dataPoint[`${seriesKey}_unit`] = tag.unit;
    });

    return Array.from(timeMap.values());
  }
}
