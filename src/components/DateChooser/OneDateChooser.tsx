
'use client';
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import useCharsStore from '@/store/charsStore'
import { format, isAfter, sub } from 'date-fns';
import { Calendar } from '../ui/calendar';
import DateChooserInput from './DateChooserInput';

const today = new Date();


export default function OneDateChooser() {

    const [openCalendar, setOpenCalendar] = useState(false);

    const selectedDate = useCharsStore((state) => state.selectedDate);
    const setSelectedDate = useCharsStore((state) => state.setSelectedDate);

    const signedDate = useCharsStore((state) => state.sign)

    const handleSelectedDate = (type: string) => {
        if (type === "Today") {
            console.log("today")
            setSelectedDate(today.toISOString());
        }
        else if (type === "Sign") {
            setSelectedDate(signedDate);
        }
        else if (type === "Start") {
            setSelectedDate(sub(new Date(), { months: 5 }).toISOString()); //TODO change!!!!!
        }
        else {
            setSelectedDate(today.toISOString());
        }
        setOpenCalendar(false)
    }




    return (
        <div className='flex gap-3 p-3 w-full relative'>
            <Button onClick={() => handleSelectedDate('Start')}>Start</Button>
            <Button onClick={() => handleSelectedDate('Sign')}>Sign</Button>

            <DateChooserInput date={selectedDate} setDate={setSelectedDate} />
            <Button onClick={() => handleSelectedDate('Today')}>Today</Button>
        </div>
    )
}
