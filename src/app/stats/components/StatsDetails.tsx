'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { handleProfitData } from '../handleProfitData';
import useCharsStore from '@/store/charsStore';
import { isSameDay, parse } from 'date-fns';
import CharCardDataView from '@/components/CharCardDataView/CharCardDataView';
import { useMemo, useState } from 'react';
import { IChar } from '@/lib/models/char.interface';
import { p, s } from 'motion/react-client';
import { transformToDate } from './../../../lib/utils/transformDate';

export default function StatsDetails({ chars }: { chars: IChar[] }) {
  const [from] = useQueryState('from', parseAsString.withOptions({ shallow: false }));
  const [to] = useQueryState('to', parseAsString.withOptions({ shallow: false }));
  const [dayToView] = useQueryState('day', parseAsString.withOptions({ shallow: false }));

  const profits = useMemo(() => {
    if (!from || !to) return [];
    return handleProfitData(
      chars,
      transformToDate(from),
      transformToDate(to),
    );
  }, [chars, from, to]);

  const profitsByChars = useMemo(() => {
    return profits.reduce((acc, pr) => {
      pr.chars.forEach((char) => {
        const existingChar = acc.find((item) => item.char.charid === char.charid);
        if (existingChar) {
          existingChar.fullProfit += pr.fullProfit;
        } else {
          acc.push({ char, fullProfit: pr.fullProfit });
        }
      });
      return acc;
    }, [] as { char: IChar; fullProfit: number }[]);
  }, [profits]);

  const profitsByDate = useMemo(() => {
    if (!dayToView) return null;
    const parsedDayToView = transformToDate(dayToView);
    const dd = profits.find((pr) => isSameDay(parsedDayToView, pr.date.split('T')[0]));
    if (!dd) return null;

    const result: { char: IChar; dayProfit: number }[] = [];

    dd.chars.forEach((ch) => {
      const dayProfit = ch.earnings
        .filter((earn) => {
          return isSameDay(parsedDayToView, earn.date.split('T')[0]);
        })
        .reduce((acc, earn) => acc + earn.amount, 0);

      const existingChar = result.find((r) => r.char.charid === ch.charid);
      if (!existingChar) {
        result.push({ char: ch, dayProfit });
      } else {
        existingChar.dayProfit += dayProfit;
      }
    });

    return result;
  }, [dayToView, profits]);

  if (!from || !to) return <div>No boundaries for details</div>;

  const noRangeProfits = (
    <div className='flex flex-col gap-2'>
      <h3 className='font-yatra mt-10'>
        No profits between {from} and {to}
      </h3>
    </div>
  );
  const noSelectedDay = (
    <div className='flex flex-col gap-2'>
      <h3 className='font-yatra mt-10'>Select a day</h3>
    </div>
  );

  const noDayProfits = (
    <div className='flex flex-col gap-2'>
      <h3 className='font-yatra mt-10'>No profits for this day</h3>
    </div>
  );

  return (
    <div className='grid grid-cols-[repeat(2,minmax(350px,50%))] gap-12 items-start'>
      <div className='flex flex-col gap-2'>
        <h3>
          <span>Total Profit: </span>
          <span className='highlighted font-yatra'>
            {profits.reduce((acc, pr) => acc + pr.fullProfit, 0)}
          </span>
        </h3>
        <div className='flex flex-col gap-2'>
          {profitsByChars.length === 0 && noRangeProfits}
          {profitsByChars.map((pr) => (
            <CharCardDataView
              key={pr.char.charid}
              id={pr.char.charid}
              charclass={pr.char.charclass}
              fraction={pr.char.fraction}>
              {' '}
              {pr.char.name} - {pr.fullProfit}
            </CharCardDataView>
          ))}
        </div>
      </div>
      {dayToView && (
        <div className='flex flex-col gap-2'>
          <h3>
            <span>Selected day: </span>
            <span className='highlighted font-yatra'>{dayToView}</span>
          </h3>
          <div className='flex flex-col gap-2'>
            {!dayToView && noSelectedDay}
            {dayToView && (!profitsByDate || profitsByDate?.length === 0) && noDayProfits}
            {profitsByDate?.map((pr) => (
              <CharCardDataView
                key={pr.char.charid}
                id={pr.char.charid}
                charclass={pr.char.charclass}
                fraction={pr.char.fraction}>
                {' '}
                {pr.char.name} - {pr.dayProfit}
              </CharCardDataView>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
