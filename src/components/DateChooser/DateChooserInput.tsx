import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { format, formatISO, parseISO } from 'date-fns';
import { CalendarW } from '../CalendarWow';

type DateChooserInputProps = {
  date: string;
  setDate: (date: string) => void;
  disabledBefore?: Date | undefined;
  disabledAfter?: Date | undefined;
};
const today = new Date();

export default function DateChooserInput({
  date,
  setDate,
  disabledBefore,
  disabledAfter,
}: DateChooserInputProps) {
  const [openCalendar, setOpenCalendar] = useState(false);

  const [oldSelected, setOldSelected] = useState(date);

  const handleCalendarSelect = (e: Date | undefined) => {
    if (!e) setDate(formatISO(oldSelected));
    else setDate(formatISO(e));

    setOpenCalendar(false);
  };

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      const calendarElement = document.querySelector('.calendarSpace');
      if (calendarElement && !(e.target as HTMLElement).closest('.calendarSpace') && openCalendar) {
        setOpenCalendar(false);
      }
    };
    document.body.addEventListener('click', outsideClick);
    return () => {
      document.body.removeEventListener('click', outsideClick);
    };
  }, [openCalendar]);

  useEffect(() => {
    setOldSelected(date);
  }, [date]);

  return (
    <>
      <Button variant={'outline'} onClick={() => setOpenCalendar((prev) => !prev)}>
        {format(date, 'dd/MM/yyyy')}
      </Button>
      {openCalendar && (
        <div className='absolute z-20 bg-background top-14 left-32 w-[300px] h-[350px] '>
          {' '}
          <CalendarW
            onDayClick={handleCalendarSelect}
            currentDate={today}
            prevSelectedDay={parseISO(oldSelected)}
            values={[]}
            disabledFrom={disabledAfter}
            disabledTo={disabledBefore}
          />
        </div>
      )}
    </>
  );
}
