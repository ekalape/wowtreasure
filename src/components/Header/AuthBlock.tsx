'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

export default function AuthBlock({ userName }: { userName: string }) {
  const handleSignOut = () => {
    console.log('signout');
    signOut();
  };

  return (
    <div className='flex gap-3 items-center mr-0 ml-auto pr-8'>
      <div className='text-pink-300 italic font-hachi text-sm'>Hi, {userName}!</div>
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
}
