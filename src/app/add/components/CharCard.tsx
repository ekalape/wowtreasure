'use client';

import { Card } from '@/components/ui/card';
import { getClassColor } from '@/lib/charClass-color';
import { IChar } from '@/lib/models/char.interface';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import alliance_img from '@/assets/aliance-icon.png';
import horde_img from '@/assets/horde-icon.png';
import clsx from 'clsx';
import { font_space_grotesk } from '@/assets/fonts';
import useCharsStore from '@/store/charsStore';
import { motion } from 'motion/react';
import { AnimatePresence } from 'framer-motion';
import EditCharModal from './EditCharModal';

import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { createPortal } from 'react-dom';

export default function CharCard(props: { char: IChar }) {
  const { char } = props;

  const [showCharSettings, setShowCharSettings] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const selectedChar = useCharsStore((state) => state.selectedChar);
  const setSelectedChar = useCharsStore((state) => state.setSelectedChar);

  const classColor = useMemo(() => getClassColor(char.charclass.toLowerCase()), [char.charclass]);

  const handleSelection = () => {
    if (!selectedChar || selectedChar.charid !== char.charid) {
      setSelectedChar(char);
    } else {
      setSelectedChar(null);
    }
  };

  const handleSettingsAction = async (target: HTMLElement) => {
    if (target.textContent === 'Edit') {
      setOpenEditModal(true);
    }
    if (target.textContent === 'Delete') {
      try {
        setIsPending(true);
        const res = await fetch('/api/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ charid: char.charid }),
        });

        const data = await res.json();

        if (!data.success) {
          console.error('Ошибка при удалении:', data.error);
        } else {
          router.refresh();
          console.log('Персонаж успешно удалён');
        }
      } catch (e) {
        console.error('Ошибка при запросе:', e);
      } finally {
        setIsPending(false);
      }
    }
    setShowCharSettings(false);
  };

  useEffect(() => {
    const outsideClick = (e: MouseEvent) => {
      const cardElement = document.querySelector('.char-card');
      if (cardElement && !(e.target as HTMLElement).closest('.char-card') && showCharSettings) {
        setShowCharSettings(false);
      }
      if (cardElement && (e.target as HTMLElement) === cardElement) {
        setShowCharSettings((prev) => !prev);
      }
    };
    document.body.addEventListener('click', outsideClick);
    return () => {
      document.body.removeEventListener('click', outsideClick);
    };
  }, [showCharSettings]);

  return (
    <div className='relative bg-background z-10'>
      <motion.div
        className='relative z-20 bg-background'
        animate={showCharSettings ? { y: -6 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
        <Card
          className='char-card w-20 bg-background p-2 pb-1 flex flex-col items-center border-2 cursor-pointer relative'
          title={char.name}
          style={{
            borderColor: classColor,
            backgroundColor:
              selectedChar?.charid === char.charid ? `${classColor}4D` : 'transparent',
          }}
          onClick={handleSelection}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowCharSettings((prev) => !prev);
          }}>
          <Image
            src={char.fraction.toLowerCase() === 'horde' ? horde_img.src : alliance_img.src}
            alt=''
            width={30}
            height={30}
          />
          <p
            className={clsx(
              font_space_grotesk.className,
              'w-full text-center text-md italic truncate',
            )}
            style={{ color: classColor }}>
            {char.name}
          </p>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showCharSettings && (
          <motion.div
            initial={{ opacity: 0, y: '-100%', zIndex: -100 }}
            animate={{ opacity: 1, y: 0, zIndex: 0 }}
            exit={{ opacity: 0, y: '-100%', zIndex: -100 }}
            transition={{ duration: 0.3 }}
            className='absolute -bottom-20 left-0 w-full z-0 flex flex-col gap-2 bg-background p-2 rounded-lg text-blue-400 font-hachi shadow-lg'
            onClick={(e) => handleSettingsAction(e.target as HTMLElement)}>
            <p className='hover:bg-background_alt  hover:text-foreground duration-200 p-1 cursor-pointer'>
              Edit
            </p>
            <p className='hover:bg-background_alt  hover:text-foreground duration-200 p-1 cursor-pointer'>
              Delete
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {openEditModal && (
        <EditCharModal open={openEditModal} onClose={setOpenEditModal} char={char} />
      )}
      {isPending && createPortal(<Loading />, document.body)}
    </div>
  );
}
