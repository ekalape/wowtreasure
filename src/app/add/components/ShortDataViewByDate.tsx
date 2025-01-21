import CharCardDataView from '@/components/CharCardDataView/CharCardDataView'
import { IChar } from '@/lib/models/char.interface'
import { parseISO, isWithinInterval, eachDayOfInterval } from 'date-fns'
import React from 'react'




type ShortDataViewPropsType = {
    char: IChar,
    fromDate: string,
    toDate: string
}

interface ResultItem {
    char: IChar;
    date: string;
    amount: number;
}


export default function ShortDataViewByDate({ char, fromDate, toDate }: ShortDataViewPropsType) {

    const profits: ResultItem[] = [];

    const profs = char.earnings.filter((pr) => isWithinInterval(pr.date, { start: fromDate, end: toDate }) && pr.amount > 0);
    if (!profs) return []
    const groupedByDate: Record<string, number> = {};

    profs.forEach(({ date, amount }) => {
        groupedByDate[date] = (groupedByDate[date] || 0) + amount;
    });

    for (const date in groupedByDate) {
        profits.push({
            char: char,
            date,
            amount: groupedByDate[date],
        });
    };


    return (
        <div className='flex flex-col gap-2 w-full'>
            {profits.map(pr => (
                <CharCardDataView key={pr.char.id} id={pr.char.id} charclass={pr.char.class} fraction={pr.char.fraction}> {pr.date} - {pr.amount}</CharCardDataView>
            ))}

        </div>
    )
}
