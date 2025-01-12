import { CharClass } from './CharClass';

export interface IChar {
    id: string;
    name: string;
    fraction: string;
    server: string;
    class: string;
    //class: CharClass;
    createdAt: string;
    earnings: IProfit[];
}

export interface IProfit {
    date: string;
    amount: number
}

export type CharDataType = Pick<IChar, 'name' | 'server' | 'class' | 'fraction'>