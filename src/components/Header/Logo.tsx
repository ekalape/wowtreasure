import React from 'react';
import Image from 'next/image';
import logoImg from '@/assets/w-icon.png';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/routes';

export default function () {
  return (
    <div className='py-1 px-3'>
      <Link href={ROUTES.HOME}>
        <Image src={logoImg.src} alt={'Logo'} width={80} height={80} className='m-2 absolute left-6 top-8'></Image>
      </Link>
    </div>
  );
}
