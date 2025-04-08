import { routes } from '@/lib/utils/routes';
import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import SlopeDivider from '../ui/SlopeDivider';
import TimeSignSet from './TimeSignSet';
import AuthBlock from './AuthBlock';
import { get } from 'http';
import { getServerSession } from 'next-auth';

export default async function Header() {
  const session = await getServerSession();
  console.log(session);

  return (
    <section className='flex flex-col gap-3 bg-transparent relative'>
      <div className='flex items-center mt-4 gap-3 bg-gradient-to-b from-background to-background_alt'>
        <Logo></Logo>
        <TimeSignSet />
        <Menu menuItems={routes}></Menu>
        <AuthBlock userName={session?.user?.name || 'Guest'} />
      </div>
      <SlopeDivider fillColor='var(--background-alt)' />
    </section>
  );
}
