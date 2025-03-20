'use client';

import { Calendar } from '@/components/ui/calendar';
import useCharsStore from '@/store/charsStore';
import { useSearchParams } from 'next/navigation';
import { format, isAfter, isBefore, parse } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { IChar, IProfit } from '@/lib/models/char.interface';


const today = new Date();

export default function StatsCalendar({ chars }: { chars: IChar[] }) {
    const searchParams = useSearchParams();

    const sign = useCharsStore(state => state.sign);

    const from = useMemo(() => parse(searchParams.get('from') || format(sign, 'dd-MM-yyyy'), 'dd-MM-yyyy', new Date()), [searchParams, sign]);
    const to = useMemo(() => parse(searchParams.get('to') || format(today, 'dd-MM-yyyy'), 'dd-MM-yyyy', new Date()), [searchParams]);
    const dayToView = searchParams.get('dayToView')

    const [viewedDay, setViewedDay] = useState(dayToView ? parse(dayToView, 'dd-MM-yyyy', new Date()) : today);

    const [displayedDates, setDisplayedDates] = useState<{ from: Date, to: Date }>({ from: new Date(from), to: new Date(to) });


    const profits = useMemo(() => chars.map(char => ({
        ...char,
        earnings: char.earnings.filter(earning =>
            new Date(earning.date) >= from && new Date(earning.date) <= to
        )
    })), [chars, from, to]);

    const profitsByDate = useMemo(() => {
        const result = Object.values(profits.reduce((acc, char) => {
            char.earnings.forEach(earning => {
                const earningDate = earning.date.split('T')[0];

                if (new Date(earningDate) >= from && new Date(earningDate) <= to) {
                    if (!acc[earningDate]) {
                        acc[earningDate] = { date: earningDate, chars: [], fullProfit: 0 };
                    }
                    acc[earningDate].chars.push(char);
                    acc[earningDate].fullProfit += earning.amount;
                }
            });
            return acc;
        }, {} as Record<string, { date: string; chars: IChar[]; fullProfit: number }>)
        );
        return result;
    }, [profits, from, to]);

    useEffect(() => {

        setDisplayedDates({ from, to })
    }, [from, to])



    return (
        <div>
            <Calendar selected={viewedDay} mode='single'
                onSelect={(e: Date | undefined) => setViewedDay(e || today)}
                toDate={today}
                modifiers={{
                    displayedDates: displayedDates,
                    heavy: profitsByDate.filter(pr => pr.fullProfit >= 10000).map(pr => new Date(pr.date)),
                    medium: profitsByDate.filter(pr => pr.fullProfit >= 1000 && pr.fullProfit < 10000).map(pr => new Date(pr.date)),
                    light: profitsByDate.filter(pr => pr.fullProfit < 1000).map(pr => new Date(pr.date))
                }}

                modifiersClassNames={{ displayedDates: 'text-pink-300', heavy: 'bg-blue-700/80', medium: 'bg-blue-700/50', light: 'bg-blue-700/20' }}
            />
        </div>
    )
}
