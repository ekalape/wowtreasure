import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { format, formatISO } from 'date-fns';
import { Calendar } from '../ui/calendar';

type DateChooserInputProps = {
  date: string;
  setDate: (date: string) => void;
  freeChoice?: boolean;
};
const today = new Date();

export default function DateChooserInput({ date, setDate }: DateChooserInputProps) {
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleCalendarSelect = (e: Date | undefined) => {
    if (!e) setDate(formatISO(today));
    else setDate(formatISO(e));
    setOpenCalendar(false);
  };

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      const calendarElement = document.querySelector('.setDateCalendar');
      if (calendarElement && !(e.target as HTMLElement).closest('.setDateCalendar')) {
        if (openCalendar) {
          setOpenCalendar(false);
        }
      }
    };
    document.body.addEventListener('click', outsideClick);
    return () => {
      document.body.removeEventListener('click', outsideClick);
    };
  }, [openCalendar]);

  return (
    <>
      <Button variant={'outline'} onClick={() => setOpenCalendar((prev) => !prev)}>
        {format(date, 'dd/MM/yyyy')}
      </Button>
      {openCalendar && (
        <div className='absolute z-20 bg-background top-14 left-32 w-[300px] h-[350px] '>
          {' '}
          <Calendar
            mode='single'
            selected={today}
            toDate={today}
            showOutsideDays
            fixedWeeks
            weekStartsOn={1}
            footer={
              date ? (
                <p className='mt-2 text-center'>You chose: {format(date, 'dd/MM/yyyy')}</p>
              ) : null
            }
            onSelect={(e) => handleCalendarSelect(e)}
            className='setDateCalendar rounded-md border w-full '
          />
        </div>
      )}
    </>
  );
}
