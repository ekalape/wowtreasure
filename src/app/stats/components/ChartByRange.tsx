import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import useCharsStore from '@/store/charsStore';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

type RangeChartType = {
  period: string;
  fullProfit: number;
}[];
const chartConfig: ChartConfig = {
  fullProfit: {
    label: 'Profit',
    color: 'var(--primary)',
  },
};

export default function ChartByRange() {
  const [fullChartData, setFullChartData] = useState<RangeChartType>([]);
  const sign = useCharsStore((state) => state.sign);

  useEffect(() => {
    const updateRanges = async () => {
      const result = await fetch('/api/range');
      const res = await result.json();
      if (res.success && res.ranges) {
        const ranges = res.ranges.map((range: { from: string; to: string; fullProfit: number }) => {
          return { period: range.from + ' period ' + range.to, fullProfit: range.fullProfit };
        });
        if (ranges.length > 6) ranges.splice(0, ranges.length - 6);
        setFullChartData(ranges);
      }
      if (res.error) {
        console.log('update ranges error');
      }
    };
    updateRanges();
  }, [sign]);

  if (!fullChartData.length)
    return (
      <>
        <h3>No data yet</h3>
      </>
    );

  return (
    <ChartContainer config={chartConfig} className='min-h-[100px] max-h-[250px] w-full'>
      <BarChart data={fullChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='period'
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          tickFormatter={(value) =>
            value
              .split(' period ')
              .map((v: string) => format(new Date(v), 'dd/MM'))
              .join(' - ')
          }
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              nameKey='fulProfit'
              indicator='line'
              color='var(--foreground-alt)'
            />
          }
        />
        <Bar dataKey='fullProfit' fill='var(--primary)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
