'use client';

import { Button } from '@/components/ui/button';
import { getClassColor } from '@/lib/charClass-color';
import { IChar } from '@/lib/models/char.interface';

import { isSameDay, sub } from 'date-fns';

import { useState } from 'react';

type LastEntriesSingleType = {
  charName: string;
  classColor: string;
};

type LastEntriesType = {
  today: LastEntriesSingleType[];
  yesterday: LastEntriesSingleType[];
  twoDaysAgo: LastEntriesSingleType[];
  threeDaysAgo: LastEntriesSingleType[];
};

export default function LastEntriesList({ chars }: { chars: IChar[] }) {
  const [show, setShow] = useState(false);

  const today = new Date();

  const lastDays = [
    today,
    sub(today, { days: 1 }),
    sub(today, { days: 2 }),
    sub(today, { days: 3 }),
  ];

  const lastEntries: LastEntriesType = {
    today: [],
    yesterday: [],
    twoDaysAgo: [],
    threeDaysAgo: [],
  };

  chars.forEach((char) => {
    const earns = char.earnings.filter((ern) =>
      lastDays.some((ld) => isSameDay(new Date(ern.date), ld)),
    );
    if (earns.length > 0) {
      const td = earns.filter((ern) => isSameDay(new Date(ern.date), today));
      const yesterday = earns.filter((ern) =>
        isSameDay(new Date(ern.date), sub(today, { days: 1 })),
      );
      const twoDaysAgo = earns.filter((ern) =>
        isSameDay(new Date(ern.date), sub(today, { days: 2 })),
      );
      const threeDaysAgo = earns.filter((ern) =>
        isSameDay(new Date(ern.date), sub(today, { days: 3 })),
      );
      const classColor = getClassColor(char.charclass.toLowerCase()) || '';
      if (td.length > 0) {
        if (lastEntries.today.some((entry) => entry.charName === char.name)) {
          return;
        }
        lastEntries.today.push({ charName: char.name, classColor: classColor });
      }
      if (yesterday.length > 0) {
        if (lastEntries.yesterday.some((entry) => entry.charName === char.name)) {
          return;
        }
        lastEntries.yesterday.push({
          charName: char.name,
          classColor: classColor,
        });
      }
      if (twoDaysAgo.length > 0) {
        if (lastEntries.twoDaysAgo.some((entry) => entry.charName === char.name)) {
          return;
        }
        lastEntries.twoDaysAgo.push({
          charName: char.name,
          classColor: classColor,
        });
      }
      if (threeDaysAgo.length > 0) {
        if (lastEntries.threeDaysAgo.some((entry) => entry.charName === char.name)) {
          return;
        }
        lastEntries.threeDaysAgo.push({
          charName: char.name,
          classColor: classColor,
        });
      }
    }
  });

  return (
    <div className='relative w-full p-2'>
      <Button variant='outline' onClick={() => setShow((prev) => !prev)}>
        Show last entries
      </Button>
      {show && (
        <div
          className='max-h-96 min-w-[600px] w-full grid grid-cols-2 
         p-4 absolute left-[103%] -top-6 overflow-y-auto bg-background
          border-2 border-background_alt rounded-lg gap-2'>
          <LastEntriesByDay title='Today' data={lastEntries.today} />
          <LastEntriesByDay title='Yesterday' data={lastEntries.yesterday} />
          <LastEntriesByDay title='2 days ago' data={lastEntries.twoDaysAgo} />
          <LastEntriesByDay title='3 days ago' data={lastEntries.threeDaysAgo} />
        </div>
      )}
    </div>
  );
}

const LastEntriesByDay = ({ title, data }: { title: string; data: LastEntriesSingleType[] }) => (
  <div className='w-full flex flex-col border-b-2 border-background_alt'>
    <h3 className='italic text-foreground_alt'>{title}:</h3>
    <div className='flex gap-1 flex-wrap mt-2 mb-2'>
      {data.length === 0 && <span className='text-sm text-muted p-1 italic'>{`<empty>`}</span>}
      {data.map((char, index) => (
        <>
          <span
            key={index}
            className='text-sm text-foreground p-1'
            style={{
              borderColor: char.classColor,
              backgroundColor: `${char.classColor}4D`,
            }}>
            {char.charName}
          </span>
          <span> </span>
        </>
      ))}
    </div>
  </div>
);
