'use client';

import { Button } from '@/components/ui/button';
import { WowTokenType } from '@/lib/models/user.interface';
import { isBefore } from 'date-fns';
import { useState } from 'react';

export default function TokensList({ tokens }: { tokens: WowTokenType[] }) {
  const [show, setShow] = useState(false);
  return (
    <div className='relative w-full p-2'>
      <Button variant='outline' onClick={() => setShow((prev) => !prev)}>
        Show all
      </Button>
      {show && (
        <div className='mt-2 max-h-96 p-6 absolute left-0 overflow-y-auto bg-background border-2 border-background_alt rounded-lg '>
          {tokens
            .sort((a, b) => (isBefore(b.date, a.date) ? 1 : -1))
            .map((token, index) => (
              <div key={index} className='flex flex-col gap-2 p-2 border-b border-background_alt'>
                <div>
                  <span className='text-sm text-foreground_alt'>
                    {new Date(token.date).toLocaleDateString()}
                  </span>
                  <span className='text-sm text-primary'> - </span>
                  <span className='text-sm text-foreground_alt'>{token.price}</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
