import React from 'react';
import { getAllCharsAction } from '../actions/UserAction';
import { handleProfitData } from './handleProfitData';
import { parse, sub } from 'date-fns';
import Chart from './Chart';

type searchParamsProps = {
  from: string;
  to: string;
  dayToView: string;
};

const today = new Date();
const oneWeekAgo = sub(today, { weeks: 1 });

export default async function ChartPage({
  searchParams,
}: {
  searchParams: Promise<searchParamsProps>;
}) {
  const chars = await getAllCharsAction();
  const { from, to } = await searchParams;
  const profits = handleProfitData(
    chars,
    from ? parse(from, 'dd-MM-yyyy', new Date()) : oneWeekAgo,
    to ? parse(to, 'dd-MM-yyyy', new Date()) : today,
  );

  return (
    <div className='w-full flex justify-center p-3'>
      {profits.length === 0 ? (
        <h3 className='mt-2 font-yatra text-lg'>No profits found for this range</h3>
      ) : (
        <Chart profits={profits} from={from} to={to} />
      )}
    </div>
  );
}
