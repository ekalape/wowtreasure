

export interface IChar {
    id: string;
    name: string;
    fraction: string;
    server: string;
    class: string;
    createdAt: string;
    earnings: IProfit[];
}

export interface IProfit {
    date: string;
    amount: number
}

export type CharDataType = Pick<IChar, 'name' | 'server' | 'class' | 'fraction'>