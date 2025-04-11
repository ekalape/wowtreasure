'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import useCharsStore from '@/store/charsStore';
import { formatISO, sub } from 'date-fns';
import DateChooserInput from './DateChooserInput';

const today = new Date();

export default function OneDateChooser() {
  const [_, setOpenCalendar] = useState(false);

  const selectedDate = useCharsStore((state) => state.selectedDate);
  const setSelectedDate = useCharsStore((state) => state.setSelectedDate);

  const signedDate = useCharsStore((state) => state.sign);

  const handleSelectedDate = (type: string) => {
    if (type === 'Today') {
      setSelectedDate(formatISO(today));
    } else if (type === 'Sign') {
      setSelectedDate(signedDate);
    } else if (type === 'Start') {
      setSelectedDate(sub(new Date(), { months: 10 }).toISOString()); //TODO change!!!!!
    } else {
      setSelectedDate(formatISO(today));
    }
    setOpenCalendar(false);
  };

  return (
    <div className='flex gap-3 p-3 w-full relative'>
      <Button onClick={() => handleSelectedDate('Start')}>Start</Button>
      <Button onClick={() => handleSelectedDate('Sign')}>Sign</Button>

      <DateChooserInput date={selectedDate} setDate={setSelectedDate} />
      <Button onClick={() => handleSelectedDate('Today')}>Today</Button>
    </div>
  );
}
