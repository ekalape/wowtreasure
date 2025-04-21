import { IChar } from '@/lib/models/char.interface';
import { isAfter, isBefore, isSameDay, parseISO } from 'date-fns';

export function handleProfitData(chars: IChar[], from: Date, to: Date) {
  const result = Object.values(
    chars.reduce((acc, char) => {
      const filteredEarnings = char.earnings.filter((earning) => {
        const date = parseISO(earning.date);
        return (
          (isAfter(date, from) && isBefore(date, to)) ||
          isSameDay(date, to) ||
          isSameDay(date, from)
        );
      });

      const earningsByDate: Record<string, number> = {};
      filteredEarnings.forEach((e) => {
        const date = e.date.split('T')[0];
        earningsByDate[date] = (earningsByDate[date] || 0) + e.amount;
      });

      Object.entries(earningsByDate).forEach(([date, amount]) => {
        if (!acc[date]) {
          acc[date] = { date, chars: [], fullProfit: 0 };
        }

        acc[date].chars.push({
          ...char,
          earnings: filteredEarnings.filter((e) => e.date.startsWith(date)),
        });

        acc[date].fullProfit += amount;
      });

      return acc;
    }, {} as Record<string, { date: string; chars: IChar[]; fullProfit: number }>),
  );

  return result;
}
