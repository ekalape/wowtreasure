"use client";
import { IChar } from '@/lib/models/char.interface';
import CharCard from './CharCard';
import { AddNewCharModal } from './AddNewCharModal';
import { isAfter, sub } from 'date-fns';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function CharsHolder({ chars }: { chars: IChar[] }) {

  const [showAllChars, setShowAllChars] = useState(false)

  const sortedAll = sortByActivity(chars)
  const activeChars = sortedAll.filter(isActive)
  const inactiveChars = sortedAll.filter(ch => !isActive(ch))

  return (
    <div className='flex flex-col w-full relative z-3'>
      <div className='flex gap-2 w-full items-center justify-start mt-2 flex-wrap'>
        {activeChars.map((ch) => (
          <CharCard key={ch.charid} char={ch} />
        ))}

        <AnimatePresence>
          {showAllChars && inactiveChars.map((ch) => (
            <motion.div
              key={ch.charid}
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ overflow: 'hidden' }}
            >
              <CharCard char={ch} />
            </motion.div>
          ))}
        </AnimatePresence>

        <AddNewCharModal />
      </div>

      <div className="mt-2">
        <button
          className="btn-shine"
          onClick={() => setShowAllChars(!showAllChars)}
        >
          {showAllChars ? "hide inactive" : `show inactive (${inactiveChars.length})`}
        </button>
      </div>
    </div>
  );
}

function getLastActivityDate(char: IChar): Date | null {
  if (!char.earnings || char.earnings.length === 0) return null;
  return char.earnings.reduce<Date | null>((acc, earn) => {
    const d = new Date(earn.date);
    return acc === null || isAfter(d, acc) ? d : acc;
  }, null);
}

function sortByActivity(chars: IChar[]): IChar[] {
  return [...chars].sort((a, b) => {
    const dateA = getLastActivityDate(a);
    const dateB = getLastActivityDate(b);
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return isAfter(dateA, dateB) ? -1 : 1;
  });
}

function isActive(char: IChar): boolean {
  const periodStart = sub(new Date(), { days: 1 });
  const lastDate = getLastActivityDate(char);
  if (!lastDate) return false;
  return isAfter(lastDate, periodStart);
}