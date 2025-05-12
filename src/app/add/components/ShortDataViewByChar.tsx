import CharCardDataView from '@/components/CharCardDataView/CharCardDataView';
import useCharsStore from '@/store/charsStore';
import { compareAsc, formatDistance } from 'date-fns';

type ShortDataViewPropsType = {
  entries: number;
};

const laterDate = new Date();

export default function ShortDataViewByChar({ entries }: ShortDataViewPropsType) {
  const char = useCharsStore((state) => state.selectedChar);

  if (!char) {
    return (
      <div className='flex flex-col gap-2 w-full mt-4'>
        <h3>Choose a character</h3>
      </div>
    );
  }
  let profs = char.earnings.sort((a, b) => compareAsc(a.date, b.date));

  if (profs.length > entries) profs = profs.slice(profs.length - entries, profs.length);

  return (
    <div className='flex flex-col gap-2 w-full mt-4'>
      {profs.length === 0 && <h3 className='mt-4'>This character has no profits at all</h3>}
      {profs.map((pr, index) => (
        <CharCardDataView
          key={pr.date + pr.amount + index}
          id={char.charid}
          charclass={char.charclass}
          fraction={char.fraction}>
          {formatDistance(laterDate, pr.date || new Date()) + ' ago'} - {pr.amount}
        </CharCardDataView>
      ))}
    </div>
  );
}
