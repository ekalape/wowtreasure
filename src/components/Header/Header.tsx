import { routes } from '@/lib/utils/routes';
import React from 'react';
import Logo from './Logo';
import Menu from './Menu';
import SlopeDivider from '../ui/SlopeDivider';
import { Button } from '../ui/button';
import AddUserComponent from '@/app/add/components/AddUserComponent';


export default function Header() {
  return (
    <section className='flex flex-col gap-3 bg-transparent relative'>
      <div className='flex items-center gap-3 bg-gradient-to-b from-background to-background_alt'>
        <Logo></Logo>
        <Menu menuItems={routes}></Menu>
        <AddUserComponent />
      </div>
      <SlopeDivider fillColor='var(--background-alt)' />
    </section>
  );
}
