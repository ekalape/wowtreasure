import { IChar } from '@/lib/models/char.interface';
import { sub } from 'date-fns';
import { create } from 'zustand';
import { ICharsStore } from './store.models';
import { persist } from 'zustand/middleware';

const useCharsStore = create<ICharsStore>()(
  persist(
    (set) => ({
      chars: [],
      selectedChar: null,
      selectedDate: new Date().toISOString(),
      sign:
        typeof window !== 'undefined'
          ? localStorage.getItem('sign') || sub(new Date(), { weeks: 1 }).toISOString()
          : sub(new Date(), { weeks: 1 }).toISOString(),
      start: '10/08/2024',

      setSelectedChar: (char: IChar | null) => set({ selectedChar: char }),
      setSelectedDate: (date: string) => set({ selectedDate: date }),
      setSign: (sign: string) => {
        set({ sign: sign });
        if (typeof window !== 'undefined') {
          localStorage.setItem('sign', sign);
        }
      },

      setChars(chars: IChar[]) {
        set({ chars: chars });
      },
    }),
    {
      name: 'wwchars-store',
      partialize: (state) => ({ selectedChar: state.selectedChar, sign: state.sign }),
      onRehydrateStorage: () => {
        console.log('hydration starts');

        // optional
        return (error) => {
          if (error) {
            console.log('an error happened during hydration', error);
          } else {
            console.log('hydration finished');
          }
        };
      },
    },
  ),
);

export default useCharsStore;
