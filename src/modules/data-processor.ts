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

export class DataProcessor {
  constructor(private readonly tagsMetadata: TagsMetadata) {}

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
