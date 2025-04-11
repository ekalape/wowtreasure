'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/lib/utils/capitalize';
import styles from './style.module.css';

type MenuItemType = {
  title: string;
  link: string;
};

export default function Menu(props: { menuItems: MenuItemType[] }) {
  const pathname = usePathname();

  return (
    <div className={`${styles.menuPosition} p-1 flex items-center gap-4`}>
      {props.menuItems.map((item) => (
        <span
          className={` ${styles.menuItem} ${pathname === item.link && styles.selected}`}
          key={item.title}>
          <Link
            href={item.link}
            className={` text-xl text-blue-400  duration-400 static font-yatra flex
               before:content-[''] before:block before:rounded-full before:w-1 before:h-1 before:bg-blue-400 
                before:mt-3 before:mr-3 
                ${item.title === 'add' && 'before:hidden'}
                `}>
            {capitalize(item.title)}
          </Link>
        </span>
      ))}
    </div>
  );
}
