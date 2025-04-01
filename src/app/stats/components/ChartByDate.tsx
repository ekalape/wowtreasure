'use client';
import { IChar } from '@/lib/models/char.interface';
import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { eachDayOfInterval, format, isSameDay, parse, startOfDay } from 'date-fns';

import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { parseAsString, useQueryState } from 'nuqs';
import useCharsStore from '@/store/charsStore';
import { transformToDate } from '@/lib/utils/transformDate';

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

const today = new Date();
export default function ChartByDate({ profits }: ChartProps) {
  const signedDate = localStorage.getItem('sign') || useCharsStore((state) => state.sign);

  const [from] =
    useQueryState('from', parseAsString.withOptions({ shallow: false })) ??
    format(signedDate, 'dd-MM-yyyy');
  const [to] =
    useQueryState('to', parseAsString.withOptions({ shallow: false })) ||
    format(today, 'dd-MM-yyyy');

  const alldays = getDaysBetweenDates(from, to);

  alldays.length > 30 ? alldays.splice(0, alldays.length - 30) : alldays;

  const fullChartData = alldays.map((day) => {
    const dayProfit = profits.find((pr) => isSameDay(new Date(pr.date), transformToDate(day)));

    return {
      date: day,
      chars: dayProfit ? dayProfit.chars : [],
      fullProfit: dayProfit ? dayProfit.fullProfit : 0,
    };
  });

  return (
    <ChartContainer config={chartConfig} className='min-h-[100px] max-h-[250px] w-full'>
      <BarChart data={fullChartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 5)}
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
  const { date, chars, fullProfit } = data;
  const allchars: string[] = [...new Set(chars.map((char: IChar) => char.name))];

  return (
    <div className='rounded-lg border bg-background p-2 shadow-sm'>
      <div className='mb-2 font-yatra text-lg'>
        <span className='font-bold'>Profit: </span>
        <span>{fullProfit}</span>
      </div>
      <div className='mb-2 italic text-sky-500'>{date}</div>
      <div>
        <span className='font-bold text-pink-300 mb-2'>Characters: </span>
        <ul>
          {allchars.map((charname: string) => (
            <li key={charname}>{charname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
function getDaysBetweenDates(from: string | null, to: string | null): string[] {
  if (!from || !to) return [];
  const startDate = parse(from, 'dd-MM-yyyy', new Date());
  const endDate = parse(to, 'dd-MM-yyyy', new Date());

  const start = startOfDay(startDate);
  const end = startOfDay(endDate);

  const days = eachDayOfInterval({ start, end });

  return days.map((day) => format(day, 'dd-MM-yyyy'));
}
