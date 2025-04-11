import React from 'react';
import Image from 'next/image';
import logoImg from '@/assets/w-icon.png';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/routes';

export default function Logo() {
  return (
    <div className='py-1 px-3 relative'>
      <Link href={ROUTES.HOME}>
        <Image
          src={logoImg.src}
          alt={'Logo'}
          width={70}
          height={70}
          className='m-2 relative left-4'></Image>
      </Link>
    </div>
  );
}
