
'use client';
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import useCharsStore from '@/store/charsStore'
import { format, sub } from 'date-fns';
import DateChooserInput from './DateChooserInput';
import { useRouter } from 'next/navigation';


const today = new Date();


export default function TwoDateChooser() {

    const start = useCharsStore((state) => state.start);
    const router = useRouter();

    const signedDate = useCharsStore((state) => state.sign)


    const [rangeDate, setRangeDate] = useState<{ from: string, to: string }>({ from: signedDate, to: today.toISOString() });

    const handleDate = (type: string) => {
        if (type === "Today") {
            console.log("today")
            setRangeDate(prev => ({ ...prev, to: today.toISOString() }));
        }
        else if (type === "Sign") {
            setRangeDate(prev => ({ ...prev, from: signedDate }));
        }
        else if (type === "Start") {
            setRangeDate(prev => ({ ...prev, from: start }));
        }
        else {
            setRangeDate({ from: signedDate, to: today.toISOString() });
        }

    }

    useEffect(() => {
        router.push('/stats?from=' + format(rangeDate.from, 'dd-MM-yyyy') + '&to=' + format(rangeDate.to, 'dd-MM-yyyy'))
    }, [rangeDate])

    return (
        <div className='flex gap-3 p-3 w-full relative'>
            <Button onClick={() => handleDate('Start')}>Start</Button>
            <Button onClick={() => handleDate('Sign')}>Sign</Button>

            <DateChooserInput
                date={rangeDate.from || signedDate} setDate={(d) => setRangeDate(prev => ({ ...prev, from: d }))} />
            <DateChooserInput
                date={rangeDate.to} setDate={(d) => setRangeDate(prev => ({ ...prev, to: d }))} />
            <Button onClick={() => handleDate('Today')}>Today</Button>
        </div>
    )
}
