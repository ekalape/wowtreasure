'use client';
import CharsHolder from './components/CharsHolder';
import AddProfitForm from './components/AddProfitForm';
import ShortDataViewByChar from './components/ShortDataViewByChar';
import { format, isSameDay } from 'date-fns';
import ShortDataViewByDate from './components/ShortDataViewByDate';
import useCharsStore from '@/store/charsStore';
import OneDateChooser from '@/components/DateChooser/OneDateChooser';
import { useEffect, useState } from 'react';

import { IChar } from '@/lib/models/char.interface';

export default function AddMainPage({ chars }: { chars: IChar[] }) {
  const selectedChar = useCharsStore((state) => state.selectedChar);
  const selectedDate = useCharsStore((state) => state.selectedDate);
  const setSelectedChar = useCharsStore((state) => state.setSelectedChar);

  const [total, setTotal] = useState(0);
  const [totalForChar, setTotalForChar] = useState(0);

  useEffect(() => {
    if (chars) {
      setTotal(
        chars.reduce((acc, curr) => {
          if (!curr.earnings) return acc;
          return (
            acc +
            curr.earnings.reduce((acc, c) => {
              if (!isSameDay(c.date, selectedDate)) return acc;
              return acc + c.amount;
            }, 0)
          );
        }, 0),
      );
      if (selectedChar) {
        const charId = selectedChar?.charid;
        setSelectedChar(chars.find((char) => char.charid === charId) || null);
      }
    }
  }, [chars, selectedDate]);

  useEffect(() => {
    const charsProfit =
      selectedChar?.earnings.reduce((acc, curr) => {
        if (!isSameDay(curr.date, selectedDate)) return acc;
        return acc + curr.amount;
      }, 0) || 0;

    setTotalForChar(charsProfit <= total ? Number(((charsProfit * 100) / total).toFixed(2)) : 0);
  }, [selectedDate, selectedChar, total]);

  useEffect(() => {
    if (chars.length > 0) setSelectedChar(chars[0]);
  }, []);

  return (
    <div className='flex flex-col gap-12 w-full items-center justify-start'>
      <CharsHolder chars={chars} />
      <section className='flex w-1/3'>
        <OneDateChooser />
      </section>
      <section className='flex gap-12 w-full'>
        <AddProfitForm charid={selectedChar?.charid as string} date={selectedDate} />
        <div className='w-1/3 border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
          {selectedChar ? (
            <>
              <h2>
                Last entries of{' '}
                <span className='highlighted font-yatra text-xl'>{selectedChar?.name}</span>
              </h2>
              <ShortDataViewByChar entries={3} />
            </>
          ) : (
            <h2>Choose a character</h2>
          )}
        </div>
        <div className='w-1/3 border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
          <h2 className='right-h2'>
            Entries in{' '}
            <span className='highlighted font-yatra text-xl'>
              {format(selectedDate, 'dd-MMMM-yyyy')}
            </span>
          </h2>
          <ShortDataViewByDate day={selectedDate} chars={chars} />
        </div>
      </section>
      <section className='w-fit bg-sky-950/20 border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
        <div className='italic font-hachi'>
          Total for{' '}
          <span className='text-xl  not-italic font-yatra text-foreground_alt'>
            {selectedChar?.name}
          </span>
          : <span className='highlighted font-yatra not-italic text-pink-300'>{totalForChar}%</span>
        </div>
        <div className='italic font-hachi '>
          Total this day:{' '}
          <span className='highlighted font-yatra not-italic text-pink-300'>{total}</span>
        </div>
      </section>
    </div>
  );
}
