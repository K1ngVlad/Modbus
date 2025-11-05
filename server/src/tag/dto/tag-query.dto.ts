export class TagQueryDto {
  tagNames?: string[];
  deviceNames?: string[];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export interface TagQueryRequest {
  tagNames?: string;
  deviceNames?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}
