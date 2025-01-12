import { IChar } from './char.interface';

export interface IUser {
    id: string;
    name: string;
    email: string;
    chars: IChar[];
    lastVisitedAt: number;
    wowTokens: WowTokenType[]
}


export interface WowTokenType {
    date: string;
    price: number;
}

export type UserDataType = Pick<IUser, "id" | "name">