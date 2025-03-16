import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';


type DateChooserInputProps = {
    date: string;
    setDate: (date: string) => void;
}
const today = new Date();

export default function DateChooserInput({ date, setDate }: DateChooserInputProps) {
    const [openCalendar, setOpenCalendar] = useState(false);
    useEffect(() => {
        const outsideClick = (e: MouseEvent) => {
            const calendarElement = document.querySelector('.setDateCalendar');
            if (calendarElement && !(e.target as HTMLElement).closest('.setDateCalendar')) {
                if (openCalendar) {
                    setOpenCalendar(false);
                }
            }
        }
        document.body.addEventListener('click', outsideClick)
        return () => {
            document.body.removeEventListener('click', outsideClick)
        }
    }, [openCalendar])
    return (<>
        <Button variant={'outline'}
            onClick={() => setOpenCalendar(prev => !prev)}>{format(date || today, 'dd/MM/yyyy')}</Button>
        {openCalendar && <div className='absolute z-20 bg-background top-14 left-32 w-[300px] h-[350px] '> <Calendar mode='single'
            selected={today} toDate={today}
            showOutsideDays fixedWeeks weekStartsOn={1}
            footer={date ? <p className="mt-2 text-center">You chose: {format(date, 'dd/MM/yyyy')}</p> : null}
            onSelect={(e) => { setDate(e?.toISOString() || today.toISOString()); setOpenCalendar(false) }}
            className="setDateCalendar rounded-md border w-full " /></div>}
    </>
    )
}
