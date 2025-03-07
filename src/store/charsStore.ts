import { IChar } from '@/lib/models/char.interface';
import { sub } from 'date-fns';
import { create } from 'zustand';
import { ICharsStore } from './store.models';


const tempSign = sub(new Date(), { months: 1 }).toISOString();

const useCharsStore = create<ICharsStore>((set) => ({
    chars: [],
    selectedChar: null,
    selectedDate: new Date().toISOString(),
    sign: tempSign,

    setSelectedChar: (char: IChar | null) => set(state => ({ selectedChar: char })),
    setSelectedDate: (date: string) => set(state => ({ selectedDate: date })),
    setSign: (sign: string) => set(state => ({ sign: sign })),

    setChars(chars: IChar[]) {

        set({ chars: chars })
    },

    getChars: async () => {

    },

}))


export default useCharsStore;