import { IChar } from '@/lib/models/char.interface';
import { sub } from 'date-fns';
import { create } from 'zustand';
import { ICharsStore } from './store.models';
import { persist } from 'zustand/middleware';


const tempSign = sub(new Date(), { months: 1 }).toISOString();

const useCharsStore = create<ICharsStore>()(
    persist(
        (set) => ({
            chars: [],
            selectedChar: null,
            selectedDate: new Date().toISOString(),
            sign: tempSign,

            setSelectedChar: (char: IChar | null) => set({ selectedChar: char }),
            setSelectedDate: (date: string) => set({ selectedDate: date }),
            setSign: (sign: string) => {
                console.log("sign is setted in the store", sign)
                set({ sign: sign })
            },

            setChars(chars: IChar[]) {
                set({ chars: chars })
                /* const charId = this.selectedChar?.charid;
                set({ selectedChar: chars.find(char => char.charid === charId) || null }) */
            },

            getChars: async () => {

            },

        }),
        {
            name: 'wwchars-store',
            partialize: (state) => ({ selectedChar: state.selectedChar, sign: state.sign }),
            onRehydrateStorage: (state) => {
                console.log('hydration starts')

                // optional
                return (state, error) => {
                    if (error) {
                        console.log('an error happened during hydration', error)
                    } else {
                        console.log('hydration finished')
                    }
                }
            },
        },

    ))


export default useCharsStore;