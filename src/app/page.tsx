import React from 'react';
import AuthPage from './@auth/page';
import Image from 'next/image';
import treasurepic from '@/assets/treasure-pic4.png';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession();
  if (session) {
    redirect('/add');
  }
  return (
    <div className='flex flex-col items-center h-screen w-full overflow-hidden'>
      <section className='fixed h-screen w-full z-[-1]'>
        <Image src={treasurepic.src} alt='Hero background' fill priority className='object-cover' />
      </section>
    </div>
  );
}
