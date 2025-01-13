
import { ICharsDataTransfer } from '../models/dataTransfer.interface';
import { CharDataType, IChar } from '../models/char.interface';
import { v4 as uuidv4 } from 'uuid';

export async function getAllChars(userId: string): Promise<ICharsDataTransfer> {


    const response = await fetch('http://localhost:3000/api/chars');

    if (!response) return {
        data: null,
        error: new Error("Failed to fetch data")
    };

    if (response.status !== 200) {

        return {
            data: null,
            error: new Error("Response error")
        };
    }

    return {
        data: await response.json(),
        error: null
    }
}

export async function addChar(userId: string, charData: CharDataType): Promise<ICharsDataTransfer> {

    const newChar: IChar = {
        id: uuidv4(),
        name: charData.name,
        class: charData.class,
        server: charData.server,
        fraction: charData.fraction,
        createdAt: new Date().toDateString(),
        earnings: []
    }

    return {
        data: [newChar],
        error: null
    }


}

