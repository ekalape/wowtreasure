import CharCardDataView from '@/components/CharCardDataView/CharCardDataView'
import { IChar } from '@/lib/models/char.interface'
import { parseISO, isWithinInterval, eachDayOfInterval, isSameDay } from 'date-fns'
import React, { useEffect } from 'react'




type ShortDataViewPropsType = {
    day: string;
    chars: IChar[]
}

interface ResultItem {
    char: IChar;
    date: string;
    amount: number;
}


export default function ShortDataViewByDate({ day, chars }: ShortDataViewPropsType) {



    const theDay = parseISO(day)

    const todayAdded = chars.filter(ch => {
        return ch.earnings.some(er => isSameDay(er.date, theDay))
    }).map(ch => {
        return {
            char: ch,
            earns: ch.earnings.filter(er => isSameDay(er.date, theDay)).reduce((acc, earn) => acc + earn.amount, 0)
        }
    })


    return (
        <div className='flex flex-col gap-2 w-full mt-4'>
            {todayAdded.length === 0 && <h3 className='mt-4'>This day is empty</h3>}
            {todayAdded.map(ta => (
                <CharCardDataView key={ta.char.charid} id={ta.char.charid} charclass={ta.char.charclass} fraction={ta.char.fraction}> {ta.char.name} - {ta.earns}</CharCardDataView>
            ))}

        </div>
    )
}
