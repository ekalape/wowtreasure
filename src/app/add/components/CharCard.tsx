'use client';

import { Card } from '@/components/ui/card';
import { getClassColor } from '@/lib/charClass-color';
import { IChar } from '@/lib/models/char.interface';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import alliance_img from '@/assets/aliance-icon.png';
import horde_img from '@/assets/horde-icon.png';
import clsx from 'clsx';
import { font_space_grotesk } from '@/assets/fonts';
import useCharsStore from '@/store/charsStore';


export default function CharCard(props: { char: IChar }) {
  const { char } = props;

  const selectedChar = useCharsStore((state) => state.selectedChar);
  const setSelectedChar = useCharsStore((state) => state.setSelectedChar);

  const classColor = useMemo(() => getClassColor(char.class), []);

  const handleSelection = () => {
    if (!selectedChar || selectedChar.id !== char.id) {
      setSelectedChar(char);
    } else {
      setSelectedChar(null);
    }
  }


  return (
    <Card
      className='w-24 p-2 pb-1 flex flex-col items-center border-2 cursor-pointer'
      title={char.name}
      style={{
        borderColor: classColor,
        backgroundColor: selectedChar?.id === char.id ? `${classColor}4D` : 'transparent',
      }}
      onClick={handleSelection}>
      <Image
        src={char.fraction === 'horde' ? horde_img.src : alliance_img.src}
        alt={''}
        width={50}
        height={50}></Image>
      <p
        className={clsx(font_space_grotesk.className, 'w-full text-center text-lg italic truncate')}
        style={{ color: classColor }}>
        {char.name}
      </p>
    </Card>
  );
}
