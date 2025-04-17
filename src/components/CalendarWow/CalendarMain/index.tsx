import { add, format, isWithinInterval, sub } from 'date-fns';
import styles from '../styles.module.css';
import { createContext, useContext, useMemo, useState } from 'react';

import clsx from 'clsx';
import DayTile from '../DayTile';
import { createMonthDates } from '../createMonthDates';

type DateValueType = {
  date: string;
  fullProfit: number;
};

interface CalendarContextType {
  onDaySelect: (selectedDate: Date) => void;
  selectedDay?: Date | null;
  setSelectedDay: (selectedDay: Date | null) => void;
  disabledFrom?: Date;
  disabledTo?: Date;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

type CalendarPropsType = {
  onDayClick: (date: Date) => void;
  currentDate: Date;
  startDay?: Date;
  endDay?: Date;
  disabledFrom?: Date;
  disabledTo?: Date;
  values: DateValueType[];
};

export default function Calendar(props: CalendarPropsType) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const [monthDay, setMonthDay] = useState<Date>(props.currentDate);

  const monthDates = useMemo(() => {
    return createMonthDates(monthDay, props.values);
  }, [monthDay]);

  const handleMonth = (value: 'prev' | 'next') => {
    if (value === 'prev') {
      setMonthDay(sub(monthDay, { months: 1 }));
    } else if (value === 'next') {
      setMonthDay(add(monthDay, { months: 1 }));
    } else {
      setMonthDay(props.currentDate);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        onDaySelect: props.onDayClick,
        selectedDay,
        setSelectedDay,
        disabledFrom: props.disabledFrom,
        disabledTo: props.disabledTo,
      }}>
      <div className={clsx(styles.calendarWrapper, 'calenDark', 'calendarSpace')}>
        <div className={styles.calendar}>
          <div className='flex gap-2 justify-between items-center mb-3'>
            <h2>{format(monthDay, 'MMMM yyyy')}</h2>
            <div className='flex gap-4  items-center'>
              <button
                className={'text-xl text-yellow-400/70 hover:text-yellow-500 duration-200'}
                onClick={() => handleMonth('prev')}>
                {'<'}
              </button>
              <button
                className={'text-xl text-yellow-400/70 hover:text-yellow-500 duration-200'}
                onClick={() => handleMonth('next')}>
                {'>'}
              </button>
            </div>
          </div>
          <div className={styles.calendar_days}>
            {monthDates.map((d) => (
              <DayTile
                key={d.date.getTime()}
                day={d.date}
                value={d.value}
                enabled={d.enabled}
                insideRange={isWithinInterval(d.date, {
                  start: props.startDay || new Date(),
                  end: props.endDay || new Date(),
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </CalendarContext.Provider>
  );
}

export const useCalendarContext = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
