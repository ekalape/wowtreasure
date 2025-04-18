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

  const dates: { date: Date; enabled: boolean; fullProfit: number }[] = [];
  while (isSameMonth(current, currentDate)) {
    const selday = values.find((v) => isSameDay(parseISO(v.date), current));
    dates.unshift({ date: current, enabled: true, fullProfit: selday?.fullProfit || 0 });
    current = sub(current, { days: 1 });
  }

  if (getDay(current) > 0) {
    for (let i = 0; i < getDay(current); i++) {
      dates.unshift({ date: sub(current, { days: i }), enabled: false, fullProfit: 0 });
    }
  }
  if (getDay(lastDay) <= 6) {
    for (let i = 1; i <= 7 - getDay(lastDay); i++) {
      dates.push({ date: add(lastDay, { days: i }), enabled: false, fullProfit: 0 });
    }
  }

  return dates;
}
