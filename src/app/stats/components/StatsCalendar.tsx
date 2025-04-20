'use client';

import useCharsStore from '@/store/charsStore';

import { format, parse } from 'date-fns';
import { useMemo } from 'react';
import { IChar } from '@/lib/models/char.interface';
import { handleProfitData } from '../../../lib/utils/handleProfitData';
import { parseAsString, useQueryState } from 'nuqs';
import { transformToDate } from '@/lib/utils/transformDate';
import { CalendarW } from '@/components/CalendarWow';

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
  const [, setDayToView] = useQueryState('day', parseAsString.withOptions({ shallow: false }));

  const profitsByDate = useMemo(
    () =>
      handleProfitData(
        chars,
        parse(from, 'dd-MM-yyyy', new Date()),
        parse(to, 'dd-MM-yyyy', new Date()),
      ),
    [from, to],
  );

  const handleDayClick = (date: Date) => {
    setDayToView(format(date, 'dd-MM-yyyy'));
  };

  return (
    <div>
      <CalendarW
        onDayClick={handleDayClick}
        currentDate={today}
        disabledFrom={today}
        startDay={transformToDate(from)}
        endDay={transformToDate(to)}
        showTooltip={true}
        values={profitsByDate.map((pr) => ({
          date: pr.date,
          fullProfit: pr.fullProfit,
        }))}
      />
    </div>
  );
}
