'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { capitalize } from '@/lib/utils/capitalize';
import styles from './style.module.css'

type MenuItemType = {
  title: string;
  link: string;
};

export default function Menu(props: { menuItems: MenuItemType[] }) {
  const pathname = usePathname()

  return (
    <div className={`${styles.menuPosition} p-1 flex items-center gap-5`}>
      {props.menuItems.map((item) => (
        <span className={`px-2 ${styles.menuItem} ${pathname === item.link && styles.selected}`} key={item.title}>
          <Link
            href={item.link}
            className={` text-2xl text-blue-400  duration-400 static`}
          >
            {capitalize(item.title)}
          </Link></span>
      ))}
    </div>
  );
}
