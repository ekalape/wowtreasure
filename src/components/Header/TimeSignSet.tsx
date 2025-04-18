'use client';

import useCharsStore from '@/store/charsStore';
import DateChooserInput from '../DateChooser/DateChooserInput';
import { useHasHydrated } from '@/lib/utils/useHasHydrated';
import { LoaderHoriz } from '../Loader/LoaderHoriz';

type TimeSignSetProps = {
  className?: string;
};

export default function TimeSignSet({ className }: TimeSignSetProps) {
  const hasHydrated = useHasHydrated();

  const sign = useCharsStore((state) => state.sign);
  const setSign = useCharsStore((state) => state.setSign);

  return (
    <div
      className={`flex p-4 text-pink-300 font-yatra
        gap-3 
         ${className}`}>
      {!hasHydrated && <LoaderHoriz />}

      <DateChooserInput date={sign} setDate={setSign} />
    </div>
  );
}
