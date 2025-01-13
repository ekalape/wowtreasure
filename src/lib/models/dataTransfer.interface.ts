import { IChar } from './char.interface';

export interface ICharsDataTransfer {
    data: IChar[] | null;
    error: Error | null;
}
