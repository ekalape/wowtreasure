import React from 'react';
import AuthPage from './@auth/page';
import Image from 'next/image';
import treasurepic from '@/assets/treasure-pic4.png';

export default function page() {
  return (
    <div className='flex flex-col items-center h-screen w-full overflow-hidden'>
      <section className='fixed h-screen w-full z-[-1]'>
        <Image src={treasurepic.src} alt='Hero background' fill priority className='object-cover' />
      </section>
      <h2 className='text-2xl text-purple-500 font-bold text-center p-2 mt-10 mb-10 '>
        Welcome to your own treasure bank
      </h2>
      <AuthPage />
    </div>
  );
}
