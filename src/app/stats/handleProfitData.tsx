import { IChar } from '@/lib/models/char.interface';

import { isAfter, isBefore, isSameDay } from 'date-fns';

export function handleProfitData(chars: IChar[], from: Date, to: Date) {
  const result = Object.values(
    chars.reduce((acc, char) => {
      char.earnings.forEach((earning) => {
        const earningDate = earning.date.split('T')[0];

        if (
          (isAfter(new Date(earningDate), from) && isBefore(new Date(earningDate), to)) ||
          isSameDay(new Date(earningDate), to) ||
          isSameDay(new Date(earningDate), from)
        ) {
          if (!acc[earningDate]) {
            acc[earningDate] = { date: earningDate, chars: [], fullProfit: 0 };
          }
          acc[earningDate].chars.push({
            ...char,
            earnings: char.earnings.filter(
              (e) =>
                (isAfter(new Date(e.date), from) && isBefore(new Date(e.date), to)) ||
                isSameDay(new Date(e.date), to) ||
                isSameDay(new Date(e.date), from),
            ),
          });
          acc[earningDate].fullProfit += earning.amount;
        }
      });
      return acc;
    }, {} as Record<string, { date: string; chars: IChar[]; fullProfit: number }>),
  );

  return result;
}
