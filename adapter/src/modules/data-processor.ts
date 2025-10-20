export type TagMetadata = {
  name: string;
  unit: string;
  offset: number;
  mult: number;
};

export type TagData = {
  name: string;
  unit: string;
  value: number;
};

export type TagsMetadata = {
  count: number;
  data: TagMetadata[];
};

export type DeviceMetadata = {
  id: number;
  name: string;
};

export type DevicesMetadata = DeviceMetadata[];

export class DataProcessor {
  constructor(
    private readonly tagsMetadata: TagsMetadata,
    private readonly devicesMetadata: DevicesMetadata,
    private readonly devices: number[]
  ) {}

  public getDeviceName(index: number): string | null {
    const device = this.devicesMetadata.find(
      (device) => device.id === this.devices[index]
    );

    if (device) {
      return device.name;
    }

    return null;
  }

  public normalize(tags: number[]): TagData[] {
    return tags.map((tag: number, index: number) =>
      this.normalizeTag(tag, index)
    );
  }

  private normalizeTag(tag: number, index: number): TagData {
    const { mult, offset, ...tagData } = this.tagsMetadata.data[index];

    const value = tag * mult + offset;

    return { value, ...tagData };
  }
}
