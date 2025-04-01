'use client';
import { IChar } from '@/lib/models/char.interface';
import { parseAsString, useQueryState } from 'nuqs';
import React from 'react';
import { handleProfitData } from '../handleProfitData';
import { transformToDate, transformToString } from '@/lib/utils/transformDate';
import { sub } from 'date-fns';
import useCharsStore from '@/store/charsStore';
import Chart from './Chart';

const today = new Date();

export default function StatsCharts({ chars }: { chars: IChar[] }) {
  const [from] = useQueryState('from', parseAsString.withOptions({ shallow: false }));
  const [to] = useQueryState('to', parseAsString.withOptions({ shallow: false }));

  const signedDate = useCharsStore((state) => state.sign);

  const profits = handleProfitData(
    chars,
    from ? transformToDate(from) : transformToDate(signedDate),
    to ? transformToDate(to) : today,
  );

  return (
    <div className='w-full flex justify-center p-3'>
      {profits.length === 0 ? (
        <h3 className='mt-2 font-yatra text-lg'>No profits found for this range</h3>
      ) : (
        <Chart profits={profits} from={from || signedDate} to={to || transformToString(today)} />
      )}
    </div>
  );
}
