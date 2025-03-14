import { routes } from '@/lib/utils/routes';
import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import SlopeDivider from '../ui/SlopeDivider';
import TimeSignSet from './TimeSignSet';



export default function Header() {
  return (
    <section className='flex flex-col gap-3 bg-transparent relative'>
      <div className='flex items-center mt-4 gap-3 bg-gradient-to-b from-background to-background_alt'>
        <Logo></Logo>
        <TimeSignSet />
        <Menu menuItems={routes}></Menu>
      </div>
      <SlopeDivider fillColor='var(--background-alt)' />
    </section>
  );
}
