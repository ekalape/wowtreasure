import { getClassColor } from '@/lib/charClass-color';
import alliance_img from '@/assets/aliance-icon.png';
import horde_img from '@/assets/horde-icon.png';
import Image from 'next/image';
import React from 'react';

type CharCardDataViewProps = {
  id: string;
  charclass: string;
  fraction: string;
  children: React.ReactNode;
};

export default function CharCardDataViewByChar({
  charclass,
  fraction,
  children,
}: CharCardDataViewProps) {
  const classColor = getClassColor(charclass.toLowerCase());

  return (
    <div
      className='flex gap-3 border-1 rounded-xl px-3 py-1 items-center'
      style={{
        borderColor: classColor,
        backgroundColor: `${classColor}4D`,
      }}>
      <Image
        width={10}
        height={10}
        src={fraction === 'horde' ? horde_img.src : alliance_img.src}
        className='w-4 h-4 '
        alt='Fraction icon'
      />
      {children}
    </div>
  );
}
