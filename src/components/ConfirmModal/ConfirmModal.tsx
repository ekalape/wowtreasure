import React from 'react';
import { Button } from '../ui/button';

export default function ConfirmModal({
  message,
  setConfirm,
}: {
  message: string;
  setConfirm: (confirm: boolean) => void;
}) {
  const handleYes = () => {
    setConfirm(true);
  };

  const handleNo = () => {
    console.log('inside modal');
    setConfirm(false);
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-50'>
      <div className='p-8 rounded-lg bg-background items-center flex flex-col gap-2 border-2 border-background_alt shadow-lg shadow-black'>
        <h3>{message}</h3>
        <div className='flex gap-2 w-full justify-center items-center'>
          <Button onClick={handleYes}>Yes</Button>
          <Button onClick={handleNo}>No</Button>
        </div>
      </div>
    </div>
  );
}
