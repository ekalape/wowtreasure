import { IChar } from '@/lib/models/char.interface';
import { endOfMonth, isSameMonth, sub, getDay, add, isSameDay, parseISO } from 'date-fns';

export interface DayType {
  date: Date;
  enabled: boolean;
  value: number;
}

export function createMonthDates(
  currentDate: Date,
  values: {
    date: string;
    fullProfit: number;
  }[],
) {
  let current = endOfMonth(currentDate);
  const lastDay = current;

  const dates: { date: Date; enabled: boolean; value: number }[] = [];
  while (isSameMonth(current, currentDate)) {
    const selDay = values.find((v) => isSameDay(parseISO(v.date), current));
    if (selDay && selDay.fullProfit >= 0 && selDay.fullProfit < 1000) {
      dates.unshift({ date: current, enabled: true, value: 1 });
    } else if (selDay && selDay.fullProfit >= 1000 && selDay.fullProfit < 5000) {
      dates.unshift({ date: current, enabled: true, value: 2 });
    } else if (selDay && selDay.fullProfit >= 5000 && selDay.fullProfit < 10000) {
      dates.unshift({ date: current, enabled: true, value: 3 });
    } else if (selDay && selDay.fullProfit >= 10000) {
      dates.unshift({ date: current, enabled: true, value: 4 });
    } else dates.unshift({ date: current, enabled: true, value: 0 });
    current = sub(current, { days: 1 });
  }

  if (getDay(current) > 0) {
    for (let i = 0; i < getDay(current); i++) {
      dates.unshift({ date: sub(current, { days: i }), enabled: false, value: 0 });
    }
  }
  if (getDay(lastDay) <= 6) {
    for (let i = 1; i <= 7 - getDay(lastDay); i++) {
      dates.push({ date: add(lastDay, { days: i }), enabled: false, value: 0 });
    }
  }

  return dates;
}
