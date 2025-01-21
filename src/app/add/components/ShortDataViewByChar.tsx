import CharCardDataView from '@/components/CharCardDataView/CharCardDataView'
import { IChar } from '@/lib/models/char.interface'
import { parseISO, isWithinInterval, eachDayOfInterval, compareAsc, format, formatDistance } from 'date-fns'
import React from 'react'




type ShortDataViewPropsType = {
    char: IChar,
    entries: number
}


const laterDate = new Date()


export default function ShortDataViewByChar({ char, entries }: ShortDataViewPropsType) {

    const profs = char.earnings.sort((a, b) => compareAsc(a.date, b.date)).slice(char.earnings.length - entries, char.earnings.length);
    console.log(char)
    return (
        <div className='flex flex-col gap-2 w-full mt-4'>
            {profs.map((pr, index) => (
                <CharCardDataView
                    key={pr.date + pr.amount + index}
                    id={char.id}
                    charclass={char.class}
                    fraction={char.fraction}>
                    {formatDistance(laterDate, pr.date) + ' ago'} - {pr.amount}
                </CharCardDataView >
            ))
            }

        </div >
    )
}
