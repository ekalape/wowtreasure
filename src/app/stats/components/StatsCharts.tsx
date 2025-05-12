'use client';
import { IChar } from '@/lib/models/char.interface';
import { parseAsString, useQueryState } from 'nuqs';
import React, { use } from 'react';
import { handleProfitData } from '../../../lib/utils/handleProfitData';
import { transformToDate, transformToString } from '@/lib/utils/transformDate';
import useCharsStore from '@/store/charsStore';
import ChartByDate from './ChartByDate';
import ChartByChar from './ChartByChar';
import ChartByRange from './ChartByRange';

const today = new Date();

export default function StatsCharts({ charsData }: { charsData: Promise<IChar[]> }) {
  const chars = use(charsData);
  const [from] = useQueryState('from', parseAsString.withOptions({ shallow: false }));
  const [to] = useQueryState('to', parseAsString.withOptions({ shallow: false }));

  const signedDate = useCharsStore((state) => state.sign);

  const profits = handleProfitData(
    chars,
    from ? transformToDate(from) : transformToDate(signedDate),
    to ? transformToDate(to) : today,
  );

  return (
    <div className='w-full flex flex-col items-centerjustify-center p-1'>
      <h3 className='mb-3'>
        Profits between {from || signedDate} and {to || transformToString(today)}
      </h3>
      {profits.length === 0 ? (
        <h3 className='mt-2 font-yatra text-lg'>No profits found for this range</h3>
      ) : (
        <section className='grid grid-cols-2 gap-3'>
          <div className='p-2 col-span-2'>
            <ChartByDate
              profits={profits}
              from={from || signedDate}
              to={to || transformToString(today)}
            />
          </div>
          <div className='p-2'>
            <ChartByChar
              profits={profits}
              from={from || signedDate}
              to={to || transformToString(today)}
            />
          </div>
          <div className='p-2'>
            <ChartByRange />
          </div>
        </section>
      )}
    </div>
  );
}
