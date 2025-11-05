import axios from 'axios';

const API_BASE = 'http://localhost:3000/tag';

export interface TagQuery {
  tagNames?: string[];
  deviceNames?: string[];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export interface ChartDataPoint {
  timestamp: string;
  datetime: string;
  [key: string]: number | string; // deviceName-tagName: value
}

export const tagApi = {
  getChartData: async (query: TagQuery): Promise<ChartDataPoint[]> => {
    const params = new URLSearchParams();

    console.log(query.tagNames);
    console.log(query.deviceNames);

    if (query.tagNames) params.append('tagNames', query.tagNames.join(','));
    if (query.deviceNames)
      params.append('deviceNames', query.deviceNames.join(','));
    if (query.startDate)
      params.append('startDate', query.startDate.toISOString());
    if (query.endDate) params.append('endDate', query.endDate.toISOString());
    if (query.limit) params.append('limit', query.limit.toString());

    const response = await axios.get(`${API_BASE}/chart-data`, { params });
    return response.data;
  },
};
