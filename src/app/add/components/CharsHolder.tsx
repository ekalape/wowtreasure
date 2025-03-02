'use client';

import { IChar } from '@/lib/models/char.interface';
import CharCard from './CharCard';
import { AddNewCharModal } from './AddNewCharModal';

export default function CharsHolder({ chars }: { chars: IChar[] }) {


    return (
        <div className='flex gap-2 w-full items-center justify-start'>
            {chars.map((ch) => (
                <CharCard key={ch.charid} char={ch} />
            ))}
            <AddNewCharModal />

        </div>
    )
}
