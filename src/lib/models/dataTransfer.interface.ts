import { IChar } from './char.interface';

export interface ICharsDataTransfer {
    data: IChar[] | null;
    error: DataError | null;
}

export type DataError = {
    error: Error;
    message: string
}