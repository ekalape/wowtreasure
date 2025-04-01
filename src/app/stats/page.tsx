import TwoDateChooser from '@/components/DateChooser/TwoDatesChooser';
import { NuqsAdapter } from 'nuqs/adapters/next';
import React, { Suspense } from 'react';
import StatsCalendar from './components/StatsCalendar';
import StatsDetails from './components/StatsDetails';
import StatsCharts from './components/StatsCharts';
import { getAllCharsAction } from '../actions/UserAction';

export default async function StatsPage() {
  const chars = await getAllCharsAction();

  return (
    <NuqsAdapter>
      <div className='w-full h-full grid grid-cols-[1fr_2fr] gap-3 justify-items-center m-auto justify-center'>
        <section className='w-1/2 border-2 border-background_alt p-4 rounded-lg col-span-2 items-center flex justify-center'>
          <TwoDateChooser />
        </section>

        <section className='w-full border-2 border-background_alt p-4 rounded-lg flex flex-col items-center justify-center'>
          <StatsCalendar chars={chars} />
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <section className='w-full border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
            <StatsDetails chars={chars} />
          </section>

          <section className='min-w-1/2 w-full border-2 flex border-background_alt p-4 rounded-lg col-span-2 justify-center items-center'>
            <StatsCharts chars={chars} />
          </section>
        </Suspense>
      </div>
    </NuqsAdapter>
  );
}
