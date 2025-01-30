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

    getChars: async () => {
        const res = await fetch('http://localhost:3000/api/chars').then(res => res.json());
        set(state => ({ chars: res }));
    },

}))


export default useCharsStore;