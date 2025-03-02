import { IChar } from '@/lib/models/char.interface';

export interface ICharsStore {
    chars: IChar[]
    selectedChar: IChar | null
    selectedDate: string
    sign: string


    setSelectedChar: (char: IChar | null) => void,
    setSelectedDate: (date: string) => void,
    setSign: (sign: string) => void,

    setChars: (chars: IChar[]) => void,

    getChars: () => void

}