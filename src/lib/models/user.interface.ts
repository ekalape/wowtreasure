import { IChar } from './char.interface';

export interface IUser {
    userid: string;
    chars: IChar[];
    wowTokens: WowTokenType[]
}


export interface WowTokenType {
    date: string;
    price: number;
}
