import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import useCharsStore from '@/store/charsStore'
import { format, sub } from 'date-fns';


export default function OneDateChooser() {


    const selectedDate = useCharsStore((state) => state.selectedDate);
    const setSelectedDate = useCharsStore((state) => state.setSelectedDate);

    const signedDate = useCharsStore((state) => state.sign)

    const handleSelectedDate = (type: string) => {
        if (type === "Today") {
            console.log("today")
            setSelectedDate(new Date().toISOString());
        }
        else if (type === "Sign") {

            setSelectedDate(signedDate);
        }
        else if (type === "Start") {
            setSelectedDate(sub(new Date(), { months: 5 }).toISOString()); //TODO change!!!!!
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
