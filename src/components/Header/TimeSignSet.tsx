'use client';

import useCharsStore from '@/store/charsStore';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { format } from 'date-fns';

type TimeSignSetProps = {
    className?: string;
}

export default function TimeSignSet({ className }: TimeSignSetProps) {

    const sign = useCharsStore((state) => state.sign);
    const setSign = useCharsStore((state) => state.setSign);

    const handleSignToday = () => {
        setSign(new Date().toISOString());
    }

    return (
        <div className={`flex p-4 text-pink-300 font-yatra
        gap-3 
         ${className}`}>

            <Input type="date" value={format(sign, 'yyyy-MM-dd')} onChange={(e) => setSign(e.target.value)} />
            <Button onClick={handleSignToday}>Today</Button>

        </div>
    )
}
