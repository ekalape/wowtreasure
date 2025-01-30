import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import useCharsStore from '@/store/charsStore'
import { format, sub } from 'date-fns';
import { Crushed } from 'next/font/google';

export default function OneDateChooser() {


    /* const [inputDate, setInputDate] = useState(new Date().toISOString()); */
    const selectedDate = useCharsStore((state) => state.selectedDate);
    const setSelectedDate = useCharsStore((state) => state.setSelectedDate);

    const handleSelectedDate = (type: string) => {
        if (type === "Today") {
            console.log("today")
            setSelectedDate(new Date().toISOString());
        }
        else if (type === "Sign") {

            setSelectedDate(sub(new Date(), { months: 1 }).toISOString());
        }
        else if (type === "Start") {
            setSelectedDate(sub(new Date(), { months: 5 }).toISOString());
        }
        else {
            setSelectedDate(type);
        }
    }


    return (
        <div className='flex gap-3 p-3 w-full'>
            <Button onClick={() => handleSelectedDate('Start')}>Start</Button>
            <Button onClick={() => handleSelectedDate('Sign')}>Sign</Button>
            <Input type='date' value={format(new Date(selectedDate), 'yyyy-MM-dd')} onChange={(e) => setSelectedDate(e.target.value)}></Input>
            <Button onClick={() => handleSelectedDate('Today')}>Today</Button>
        </div>
    )
}
