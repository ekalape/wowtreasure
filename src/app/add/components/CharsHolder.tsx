'use client';

import { IChar } from '@/lib/models/char.interface';
import CharCard from './CharCard';

export default function CharsHolder({ chars }: { chars: IChar[] }) {


    function addNewCharacter() {
        console.log("add new character")
    }

    return (
        <div className='flex gap-2 w-full items-center'>
            {chars.map((ch) => (
                <CharCard key={ch.name} char={ch} />
            ))}
            <button
                className='w-16 h-16 rounded-full border-2 flex items-center justify-center border-foreground_alt text-foreground_alt text-3xl'
                onClick={addNewCharacter}>
                +
            </button>
        </div>
    )
}
