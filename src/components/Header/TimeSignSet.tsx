'use client';

import useCharsStore from '@/store/charsStore';
import DateChooserInput from '../DateChooser/DateChooserInput';
import { useHasHydrated } from '@/lib/utils/useHasHydrated';
import { LoaderHoriz } from '../Loader/LoaderHoriz';
import { useEffect, useState, useTransition } from 'react';
import { createPortal } from 'react-dom';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { IChar } from '@/lib/models/char.interface';
import { handleProfitData } from '@/lib/utils/handleProfitData';
import { isBefore } from 'date-fns';

type TimeSignSetProps = {
  chars: IChar[];
  currentSign: string;
  className?: string;
};

export default function TimeSignSet({ chars, className, currentSign }: TimeSignSetProps) {
  const hasHydrated = useHasHydrated();

  console.log('currentSign inside timeSignSet', currentSign);

  const sign = useCharsStore((state) => state.sign);
  const setSign = useCharsStore((state) => state.setSign);

  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [newSign, setNewSign] = useState(sign);

  const handleSetNewSign = (newsign: string) => {
    /* if (isBefore(newsign, sign)) return; */
    setNewSign(newsign);
    setShowConfirmModal(true);
  };

  useEffect(() => {
    if (confirmed) {
      const fullProfit = handleProfitData(chars, new Date(currentSign), new Date(newSign)).reduce(
        (acc, curr) => acc + curr.fullProfit,
        0,
      );
      const newRange = { from: sign, to: newSign, fullProfit };

      const updateRange = async () => {
        const res = await fetch('/api/range', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRange),
        });
        console.log(res);
        const result = await res.json();
        if (!result.success) console.log(result.error);
        if (result.success) {
          setSign(newSign);
        }
      };
      updateRange();
    } else {
      const updateSign = async () => {
        const res = await fetch('/api/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sign: newSign }),
        });
        console.log(res);
        const result = await res.json();
        if (!result.success) console.log(result.error);
        if (result.success) {
          console.log('sign updated');
          setSign(newSign);
        }
      };
      updateSign();
    }
    setShowConfirmModal(false);
    setConfirmed(null);
  }, [confirmed]);

  useEffect(() => {
    if (currentSign) setSign(currentSign);
  }, []);

  return (
    <div
      className={`flex p-4 text-pink-300 font-yatra
        gap-3 
         ${className}`}>
      {!hasHydrated && <LoaderHoriz />}
      <DateChooserInput date={sign} setDate={handleSetNewSign} />
      {showConfirmModal &&
        createPortal(
          <ConfirmModal message='Do you want to save previous range?' setConfirm={setConfirmed} />,
          document.body,
        )}
    </div>
  );
}
