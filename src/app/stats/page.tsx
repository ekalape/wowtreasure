import TwoDateChooser from '@/components/DateChooser/TwoDatesChooser';
import { NuqsAdapter } from 'nuqs/adapters/next';
import React, { Suspense } from 'react';
import StatsCalendar from './components/StatsCalendar';
import StatsDetails from './components/StatsDetails';
import StatsCharts from './components/StatsCharts';
import { getAllCharsAction } from '../actions/UserAction';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function StatsPage() {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

  const chars = getAllCharsAction();

  return (
    <NuqsAdapter>
      <div className='w-full p-8 h-full grid lg:grid-cols-[1fr_2fr] grid-cols-1 gap-3 justify-items-center m-auto  mt-8 justify-center lg:min-w-[1024px]'>
        <section className='lg:w-1/2 w-content border-2 border-background_alt p-4 rounded-lg lg:col-span-2 items-center flex justify-center min-w-[200px]'>
          <TwoDateChooser />
        </section>

        <section className='w-full border-2 border-background_alt p-4 rounded-lg flex flex-col items-center justify-center'>
          <Suspense fallback={<div>Loading...</div>}>
            <StatsCalendar charsData={chars} />
          </Suspense>
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <section className='w-full border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
            <StatsDetails charsData={chars} />
          </section>
        </Suspense>
        <section className='min-w-1/2 w-full border-2 flex border-background_alt p-4 rounded-lg lg:col-span-2 justify-center items-center'>
          <StatsCharts charsData={chars} />
        </section>
      </div>
    </NuqsAdapter>
  );
}
