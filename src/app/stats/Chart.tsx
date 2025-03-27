'use client';
import { IChar } from '@/lib/models/char.interface';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { eachDayOfInterval, format, isSameDay, parse, startOfDay } from 'date-fns';

import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';

type ChartProps = {
  profits: { date: string; chars: IChar[]; fullProfit: number }[];
  from: string;
  to: string;
};
const chartConfig: ChartConfig = {
  date: {
    label: 'Date',
    color: 'green',
  },
  fullProfit: {
    label: 'Profit',
    color: 'var(--primary)',
  },
};
export default function Chart({ profits, from, to }: ChartProps) {
  const alldays = getDaysBetweenDates(from, to);

  alldays.length > 20 ? alldays.splice(0, alldays.length - 20) : alldays;

  const fullChartData = alldays.map((day) => {
    const dayProfit = profits.find((pr) =>
      isSameDay(new Date(pr.date), parse(day, 'dd-MM-yyyy', new Date())),
    );

    return {
      date: day,
      chars: dayProfit ? dayProfit.chars : [],
      fullProfit: dayProfit ? dayProfit.fullProfit : 0,
    };
  });

  return (
    <ChartContainer config={chartConfig} className='min-h-[100px] max-h-[350px] w-full'>
      <BarChart data={fullChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={
            (value) => value.slice(0, 5) /* value.slice(5).split('-').reverse().join('/') */
          }
        />
        <ChartTooltip content={<CustomTooltip />} />
        <Bar dataKey='fullProfit' fill='var(--primary)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data: { date: string; chars: IChar[]; fullProfit: number } = payload[0].payload;
  const { chars, fullProfit } = data;
  const allchars: string[] = [...new Set(chars.map((char: IChar) => char.name))];

  return (
    <div className='rounded-lg border bg-background p-2 shadow-sm'>
      <div className='mb-2'>
        <span className='font-bold'>Profit: </span>
        <span>{fullProfit}</span>
      </div>
      <div>
        <span className='font-bold'>Characters: </span>
        <ul>
          {allchars.map((charname: string) => (
            <li key={charname}>{charname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
function getDaysBetweenDates(from: string, to: string): string[] {
  const startDate = parse(from, 'dd-MM-yyyy', new Date());
  const endDate = parse(to, 'dd-MM-yyyy', new Date());

  const start = startOfDay(startDate);
  const end = startOfDay(endDate);

  const days = eachDayOfInterval({ start, end });

  return days.map((day) => format(day, 'dd-MM-yyyy'));
}
