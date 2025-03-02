

export interface IChar {
    charid: string;
    name: string;
    fraction: string;
    server: string;
    charclass: string;
    createdAt: string;
    earnings: IProfit[];
}

export interface IProfit {
    date: string;
    amount: number
}

export type CharDataType = Pick<IChar, 'name' | 'server' | 'charclass' | 'fraction'>