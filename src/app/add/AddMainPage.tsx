'use client';
import { ICharsDataTransfer } from '@/lib/models/dataTransfer.interface';
import CharsHolder from './components/CharsHolder'
import { use, useState } from 'react';
import { AddNewCharModal } from './components/AddNewCharModal';
import AddProfitForm from './components/AddProfitForm';
import ShortDataViewByChar from './components/ShortDataViewByChar';
import { IChar } from '@/lib/models/char.interface';
import { sub } from 'date-fns';
const today = new Date().toISOString();
const from = sub(today, { months: 1 }).toISOString();

export default function AddMainPage({ charsPromise }: { charsPromise: Promise<ICharsDataTransfer> }) {

    const allchars = use(charsPromise);

    const [selectedChar, setSelectedChar] = useState<IChar | null>(allchars.data ? allchars.data[0] : null);



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
        <section className='flex gap-12 w-full'>
            <AddProfitForm />
            <div className='w-1/3 border-2 border-background_alt p-4 rounded-lg'>
                {selectedChar ? <><h2>Last entries of <span className='highlighted'>{selectedChar?.name}</span></h2>
                    <ShortDataViewByChar char={selectedChar} entries={3} /></>
                    : <h2>Choose a character</h2>
                }
            </div>
        </section>


    </div>
    )
}
