'use client';

import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { WowTokenType } from '@/lib/models/user.interface';
import useCharsStore from '@/store/charsStore';
import { format, isAfter, isBefore } from 'date-fns';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

type TokensChartType = {
  period: string;
  tokens: number;
  tokensSum: number;
}[];
const chartConfig: ChartConfig = {
  tokens: {
    label: 'Tokens',
    color: 'var(--primary)',
  },
};

export default function ChartTokens({ tokens }: { tokens: WowTokenType[] }) {
  const [fullChartData, setFullChartData] = useState<TokensChartType>([]);
  const sign = useCharsStore((state) => state.sign);

  useEffect(() => {
    const updateRanges = async () => {
      const result = await fetch('/api/range');
      const res = await result.json();

      if (res.success && res.ranges) {
        const ranges: TokensChartType = res.ranges.map(
          (range: { from: string; to: string; fullProfit: number }) => {
            const tokensInRange = tokens.filter(
              (token) => isBefore(token.date, range.to) && isAfter(token.date, range.from),
            );

            return {
              period: range.from + ' period ' + range.to,
              tokens: tokensInRange.length || 0,
              tokensSum: tokensInRange.reduce((acc, curr) => acc + curr.price, 0) || 0,
            };
          },
        );

        const currentRange = () => {
          const currenttokens = tokens.filter(
            (token) => isBefore(token.date, new Date()) && isAfter(token.date, sign),
          );
          return {
            period: sign + ' period ' + new Date().toISOString(),
            tokens: currenttokens.length || 0,
            tokensSum: currenttokens.reduce((acc, curr) => acc + curr.price, 0) || 0,
          };
        };
        /* if (ranges.length > 12) ranges.splice(0, ranges.length - 6); */

        setFullChartData([...ranges, currentRange()]);
      }
      if (res.error) {
        console.log('update ranges error');
      }
    };
    updateRanges();
  }, [sign, tokens]);

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
              .map((v: string) => format(new Date(v), 'dd MMMM'))
              .join(' - ')
          }
        />
        <ChartTooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) return null;
            const item = payload[0];
            return (
              <div className='rounded bg-background p-2 text-sm shadow'>
                <div className='text-muted-foreground'>Tokens:</div>
                <div className='font-bold'>{item.payload.tokens}</div>
                <div className='text-muted-foreground'>Expense:</div>
                <div className='font-bold'>{item.value}</div>
              </div>
            );
          }}
        />

        <Bar dataKey='tokensSum' fill='var(--primary)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
