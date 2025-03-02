import CharCardDataView from '@/components/CharCardDataView/CharCardDataView'
import { IChar } from '@/lib/models/char.interface'
import useCharsStore from '@/store/charsStore'
import { parseISO, isWithinInterval, eachDayOfInterval, compareAsc, format, formatDistance } from 'date-fns'
import React from 'react'




type ShortDataViewPropsType = {

    entries: number
}


const laterDate = new Date()


export default function ShortDataViewByChar({ entries }: ShortDataViewPropsType) {
    const char = useCharsStore((state) => state.selectedChar);

    if (!char) {
        return (
            <div className='flex flex-col gap-2 w-full mt-4'>
                <h3>Choose a character</h3>
            </div>
        )
    }

    const profs = char.earnings.sort((a, b) => compareAsc(a.date, b.date)).slice(char.earnings.length - entries, char.earnings.length);

    return (
        <div className='flex flex-col gap-2 w-full mt-4'>
            {profs.map((pr, index) => (
                <CharCardDataView
                    key={pr.date + pr.amount + index}
                    id={char.charid}
                    charclass={char.charclass}
                    fraction={char.fraction}>
                    {formatDistance(laterDate, pr.date) + ' ago'} - {pr.amount}
                </CharCardDataView >
            ))
            }

        </div >
    )
}
