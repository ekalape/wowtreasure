'use client';
import { ICharsDataTransfer } from '@/lib/models/dataTransfer.interface';
import CharsHolder from './components/CharsHolder'
import { use, useState } from 'react';
import { AddNewCharModal } from './components/AddNewCharModal';
import AddProfitForm from './components/AddProfitForm';
import ShortDataViewByChar from './components/ShortDataViewByChar';
import { IChar } from '@/lib/models/char.interface';
import { format, sub } from 'date-fns';
import ShortDataViewByDate from './components/ShortDataViewByDate';
import useCharsStore from '@/store/charsStore';
import OneDateChooser from '@/components/DateChooser/OneDateChooser';
const today = new Date().toISOString();
const from = sub(today, { months: 1 }).toISOString();

export default function AddMainPage({ charsPromise }: { charsPromise: Promise<ICharsDataTransfer> }) {

    const allchars = use(charsPromise);
    const selectedChar = useCharsStore((state) => state.selectedChar);

    const selectedDate = useCharsStore((state) => state.selectedDate);

    if (!allchars.data) {
        return (
            <div className='flex flex-col gap-2 w-full items-center justify-center'>
                <h3>Fetching error!</h3>
                <p>{allchars.error?.message}</p>
            </div>
        )
    }


    return (<div className='flex flex-col gap-12 w-full items-center justify-start'>
        <CharsHolder chars={allchars.data} />
        <section className='flex w-1/3'><OneDateChooser /></section>
        <section className='flex gap-12 w-full'>
            <AddProfitForm />
            <div className='w-1/3 border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
                {selectedChar ? <><h2>Last entries of <span className='highlighted'>{selectedChar?.name}</span></h2>
                    <ShortDataViewByChar entries={3} /></>
                    : <h2>Choose a character</h2>
                }
            </div>
            <div className='w-1/3 border-2 border-background_alt p-4 rounded-lg flex flex-col justify-start'>
                <h2 className='right-h2'>Entries in <span className='highlighted'>{format(selectedDate, 'dd-MMMM-yyyy')}</span></h2>
                <ShortDataViewByDate day={selectedDate} chars={allchars.data} />
            </div>
        </section>


    </div>
    )
}
