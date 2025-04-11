'use client';

import useCharsStore from '@/store/charsStore';
import DateChooserInput from '../DateChooser/DateChooserInput';

type TimeSignSetProps = {
  className?: string;
};

export default function TimeSignSet({ className }: TimeSignSetProps) {
  const sign = useCharsStore((state) => state.sign);
  const setSign = useCharsStore((state) => state.setSign);

  return (
    <div
      className={`flex p-4 text-pink-300 font-yatra
        gap-3 
         ${className}`}>
      <DateChooserInput date={sign} setDate={setSign} />
    </div>
  );
}
