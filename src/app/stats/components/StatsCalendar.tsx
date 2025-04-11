'use client';

import { Calendar } from '@/components/ui/calendar';
import useCharsStore from '@/store/charsStore';

import { format, parse } from 'date-fns';
import { useMemo } from 'react';
import { IChar } from '@/lib/models/char.interface';
import { handleProfitData } from '../handleProfitData';
import { parseAsString, useQueryState } from 'nuqs';
import { transformToDate } from '@/lib/utils/transformDate';

const today = new Date();

export default function StatsCalendar({ chars }: { chars: IChar[] }) {
  const sign = useCharsStore((state) => state.sign);

  const [from] = useQueryState(
    'from',
    parseAsString.withOptions({ shallow: false }).withDefault(format(sign, 'dd-MM-yyyy')),
  );
  const [to] = useQueryState(
    'to',
    parseAsString.withOptions({ shallow: false }).withDefault(format(today, 'dd-MM-yyyy')),
  );
  const [dayToView, setDayToView] = useQueryState(
    'day',
    parseAsString.withOptions({ shallow: false }),
  );

  const profitsByDate = useMemo(
    () =>
      handleProfitData(
        chars,
        parse(from, 'dd-MM-yyyy', new Date()),
        parse(to, 'dd-MM-yyyy', new Date()),
      ),
    [from, to],
  );

  return (
    <div>
      <Calendar
        selected={dayToView ? transformToDate(dayToView) : today}
        mode='single'
        onSelect={(e: Date | undefined) => setDayToView(format(e || today, 'dd-MM-yyyy'))}
        toDate={today}
        modifiers={{
          displayedDates: { from: transformToDate(from), to: transformToDate(to) },
          heavy: profitsByDate
            .filter((pr) => pr.fullProfit >= 10000)
            .map((pr) => new Date(pr.date)),
          medium: profitsByDate
            .filter((pr) => pr.fullProfit >= 1000 && pr.fullProfit < 10000)
            .map((pr) => new Date(pr.date)),
          light: profitsByDate.filter((pr) => pr.fullProfit < 1000).map((pr) => new Date(pr.date)),
        }}
        modifiersClassNames={{
          displayedDates: 'text-pink-300',
          heavy: 'bg-blue-700/80',
          medium: 'bg-blue-700/50',
          light: 'bg-blue-700/20',
        }}
      />
    </div>
  );
}
