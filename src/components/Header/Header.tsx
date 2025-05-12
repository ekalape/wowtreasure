import { routes } from '@/lib/utils/routes';
import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import SlopeDivider from '../ui/SlopeDivider';
import TimeSignSet from './TimeSignSet';
import AuthBlock from './AuthBlock';
import { getServerSession } from 'next-auth';
import { getAllCharsAction, getSign } from '@/app/actions/UserAction';

export default async function Header() {
  const session = await getServerSession();
  const chars = await getAllCharsAction();
  const signData = await getSign();

  return (
    <section className='flex flex-col gap-3 bg-transparent relative'>
      <div className='flex items-center mt-4 gap-3 bg-gradient-to-b from-background to-background_alt'>
        <Logo></Logo>
        <TimeSignSet
          chars={chars}
          currentSign={signData.success ? signData.currentSign : new Date().toISOString()}
        />
        <Menu menuItems={routes}></Menu>
        <AuthBlock userName={session?.user?.name || 'Guest'} />
      </div>
      <SlopeDivider fillColor='var(--background-alt)' />
    </section>
  );
}
