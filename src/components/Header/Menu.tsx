'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { capitalize } from '@/lib/utils/capitalize';
import styles from './style.module.css';
import { useEffect, useRef, useState } from 'react';

type MenuItemType = {
  title: string;
  link: string;
};

export default function Menu(props: { menuItems: MenuItemType[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedLink, setSelectedLink] = useState(pathname);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedLink(pathname);
    setIsOpen(false);
  }, [pathname]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(link: string) {
    setSelectedLink(link);
    setIsOpen(false);
    router.push(link);
  }

  return (
    <>
      <div
        className={`${styles.menuPosition} p-1 hidden sm:flex items-center gap-4`}
        aria-label='Navigation menu'>
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

      <div className='sm:hidden p-2 ' ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`cursor-pointer border-none rounded-lg p-2 text-blue-400 text-xl font-yatra flex items-center gap-1`}>
          <span>
            {capitalize(props.menuItems.find((i) => i.link === selectedLink)?.title || '')}
          </span>
          <span className='text-blue-400 text-xs pl-2'>{isOpen ? '▲' : '▼'}</span>
        </div>

        {isOpen && (
          <div className='mt-2 border border-blue-400 rounded-lg bg-background text-foreground shadow-lg overflow-hidden animate-fadeIn absolute z-20 p-2 pr-8'>
            {props.menuItems.map((item) => (
              <div
                key={item.title}
                onClick={() => handleSelect(item.link)}
                className={`p-2 cursor-pointer text-blue-400 font-yatra hover:text-pink-300 duration-200 ${
                  selectedLink === item.link ? 'text-pink-300' : ''
                }`}>
                {capitalize(item.title)}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
