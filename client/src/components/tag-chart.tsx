import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Card,
  Title,
  DateRangePicker,
  type DateRangePickerValue,
} from '@tremor/react';
import { tagApi, type ChartDataPoint } from '../api';

interface TagChartProps {
  tagNames: string[];
  deviceNames: string[];
}

export const TagChart: React.FC<TagChartProps> = ({
  tagNames,
  deviceNames,
}) => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 часа назад
    to: new Date(),
  });

  // Генерация ключей для серий
  const seriesKeys = deviceNames.flatMap((deviceName) =>
    tagNames.map((tagName) => `${deviceName}-${tagName}`)
  );

  // Форматирование данных для Tremor
  const chartData = data.map((item) => ({
    datetime: item.datetime,
    ...seriesKeys.reduce((acc, key) => {
      acc[key] = item[key] || 0;
      return acc;
    }, {} as any),
  }));

  const fetchData = async () => {
    if (!dateRange.from || !dateRange.to) return;

    setLoading(true);
    try {
      await tagApi.getChartData();
      //   const result = await tagApi.getChartData({
      //     tagNames,
      //     deviceNames,
      //     startDate: dateRange.from,
      //     endDate: dateRange.to,
      //     limit: 1000,
      //   });
      //   setData(result);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tagNames, deviceNames, dateRange]);

  // Авто-обновление данных каждые 10 секунд
  useEffect(() => {
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [tagNames, deviceNames, dateRange]);

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <Title>Мониторинг тегов в реальном времени</Title>
        <DateRangePicker
          value={dateRange}
          onValueChange={setDateRange}
          enableSelect={false}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <AreaChart
          data={chartData}
          categories={seriesKeys}
          index="datetime"
          colors={['blue', 'green', 'red', 'yellow', 'purple', 'pink']}
          valueFormatter={(value) => `${value}`}
          yAxisWidth={60}
          showLegend={true}
          curveType="monotone"
          connectNulls={true}
          className="h-72"
        />
      )}
    </Card>
  );
};
