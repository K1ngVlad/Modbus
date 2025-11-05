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
    from: new Date(Date.now() - 1000 * 60), // 24 часа назад
    to: new Date(),
  });

  // Генерация ключей для серий
  const seriesKeys = deviceNames.flatMap((deviceName) =>
    // tagNames.map((tagName) => `${deviceName}-${tagName}`)
    tagNames.map((tagName) => `${deviceName}-${tagName}`)
  );

  // Форматирование данных для Tremor
  const chartData = data.map((item) => ({
    datetime: item.datetime,
    ...seriesKeys.reduce((acc, key) => {
      acc[key] = item[key] || null;
      return acc;
    }, {} as any),
  }));

  console.log(chartData);

  const valueFormatter = (number: number) =>
    `${Intl.NumberFormat('us').format(number).toString()}`;

  const fetchData = async () => {
    if (!dateRange.from || !dateRange.to) return;

    setLoading(true);
    try {
      const result = await tagApi.getChartData({
        tagNames,
        deviceNames,
        startDate: dateRange.from,
        endDate: dateRange.to,
        limit: 1000,
      });
      // console.log(result);
      setData(result);
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
    <Card
      style={{
        width: '100%',
        height: 600,
      }}
    >
      {/* <div className="flex justify-between items-center mb-6">
        <Title>Мониторинг тегов в реальном времени</Title>
        <DateRangePicker
          value={dateRange}
          onValueChange={setDateRange}
          enableSelect={false}
        />
      </div> */}
      <AreaChart
        style={{
          width: '100%',
          height: '100%',
        }}
        data={chartData}
        // data={[
        //   {
        //     datetime: '5',
        //     'Мультиварка-Относительная влажность': 24,
        //     'Комбайн-Относительная влажность': 24,
        //   },
        //   {
        //     datetime: '6',
        //     'Мультиварка-Относительная влажность': 32,
        //     'Комбайн-Относительная влажность': 27,
        //   },
        // ]}
        categories={seriesKeys}
        // categories={[
        //   'Мультиварка-Относительная влажность',
        //   'Комбайн-Относительная влажность',
        // ]}
        index="datetime"
        colors={['blue', 'green', 'red', 'yellow', 'purple', 'pink']}
        connectNulls={true}
        // colors={['blue', 'green', 'red', 'yellow', 'purple', 'pink']}
        valueFormatter={valueFormatter}
        yAxisWidth={60}
        showLegend={true}
        showYAxis={true}
        showGradient={true}
        startEndOnly={true}
        curveType="monotone"
        // connectNulls={true}
        // className="h-72"
      />

      {/* <AreaChart
        style={{
          width: '100%',
          height: '100%',
        }}
        data={chartData}
        index="date"
        categories={['Organic', 'Sponsored']}
        colors={['blue', 'violet']}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        showGradient={false}
        startEndOnly={true}
        className="mt-6 h-32"
      /> */}

      {/* {loading ? (
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
      )} */}
    </Card>
  );
};
