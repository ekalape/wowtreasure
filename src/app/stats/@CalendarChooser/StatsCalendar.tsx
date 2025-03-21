'use client';

import { Calendar } from '@/components/ui/calendar';
import useCharsStore from '@/store/charsStore';
import { useSearchParams } from 'next/navigation';
import { format, parse } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { IChar } from '@/lib/models/char.interface';
import { handleProfitData } from '../handleProfitData';


const today = new Date();

export default function StatsCalendar({ chars }: { chars: IChar[] }) {
    const searchParams = useSearchParams();

    const sign = useCharsStore(state => state.sign);

    const from = useMemo(() => parse(searchParams.get('from') || format(sign, 'dd-MM-yyyy'), 'dd-MM-yyyy', new Date()), [searchParams, sign]);
    const to = useMemo(() => parse(searchParams.get('to') || format(today, 'dd-MM-yyyy'), 'dd-MM-yyyy', new Date()), [searchParams]);
    const dayToView = searchParams.get('dayToView')

    const [viewedDay, setViewedDay] = useState(dayToView ? parse(dayToView, 'dd-MM-yyyy', new Date()) : today);

    const [displayedDates, setDisplayedDates] = useState<{ from: Date, to: Date }>({ from: new Date(from), to: new Date(to) });

    const profitsByDate = useMemo(() => handleProfitData(chars, from, to), [from, to]);

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
