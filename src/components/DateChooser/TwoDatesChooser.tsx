'use client';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import useCharsStore from '@/store/charsStore';
import { format } from 'date-fns';
import DateChooserInput from './DateChooserInput';
import { parseAsString, useQueryState } from 'nuqs';

const today = new Date();

export default function TwoDateChooser() {
  const start = useCharsStore((state) => state.start);
  const signedDate = useCharsStore((state) => state.sign);

  const [, setFrom] = useQueryState('from', parseAsString.withOptions({ shallow: false }));
  const [, setTo] = useQueryState('to', parseAsString.withOptions({ shallow: false }));

  const [fromDate, setFromDate] = useState(signedDate);
  const [toDate, setToDate] = useState(today.toISOString());

  const handleDate = (type: string) => {
    if (type === 'Today') {
      setToDate(today.toISOString());
    } else if (type === 'Sign') {
      setFromDate(signedDate);
    } else if (type === 'Start') {
      setFromDate(start);
    } else {
      setFromDate(signedDate);
      setToDate(today.toISOString());
    }
  };

  useEffect(() => {
    setFrom(format(fromDate, 'dd-MM-yyyy'));
    setTo(format(toDate, 'dd-MM-yyyy'));
  }, [fromDate, toDate]);

  return (
    <div className='grid grid-cols-2 grid-rows-3 md:grid-rows-1 gap-3 p-3 w-full relative md:grid-cols-5'>
      <Button onClick={() => handleDate('Start')}>Start</Button>
      <Button onClick={() => handleDate('Sign')}>Sign</Button>
      <DateChooserInput
        date={fromDate || signedDate}
        setDate={(d) => setFromDate(d)}
        disabledAfter={today}
      />
      <DateChooserInput
        date={toDate || today.toISOString()}
        setDate={(d) => setToDate(d)}
        disabledAfter={today}
      />
      <Button onClick={() => handleDate('Today')}>Today</Button>
    </div>
  );
}
