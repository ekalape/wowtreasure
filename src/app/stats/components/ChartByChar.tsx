'use client';
import { IChar } from '@/lib/models/char.interface';
import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ChartProps = {
  profits: { date: string; chars: IChar[]; fullProfit: number }[];
  from: string;
  to: string;
};
const chartConfig: ChartConfig = {
  charName: {
    label: 'Profit',
    color: 'var(--background)',
  },
};

export default function ChartByChar({ profits }: ChartProps) {
  const profitsByChars = useMemo(() => {
    return profits.reduce((acc, pr) => {
      pr.chars.forEach((char) => {
        const existingChar = acc.find((item) => item.charId === char.charid);
        if (existingChar) {
          existingChar.fullProfit += pr.fullProfit;
        } else {
          acc.push({ charId: char.charid, charName: char.name, fullProfit: pr.fullProfit });
        }
      });
      return acc;
    }, [] as { charId: string; charName: string; fullProfit: number }[]);
  }, [profits]);

  return (
    <ChartContainer config={chartConfig} className='min-h-[100px] max-h-[250px] w-full'>
      <BarChart data={profitsByChars}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='charName'
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 5)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              nameKey='charName'
              indicator='line'
              color='var(--foreground-alt)'
            />
          }
        />
        <Bar dataKey='fullProfit' fill='var(--foreground-alt)' radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
