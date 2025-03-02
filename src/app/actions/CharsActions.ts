import { CharDataType, IChar } from '@/lib/models/char.interface';
import { connectToDb, wowUser } from '@/lib/services/mongoDb';

import CustomError from './CustomError';

console.log("CharsActions.ts loaded");
type NewCharFormDataType = {
    chars: IChar[] | null, error: Error | null
}

export async function addNewCharacter(newCharacter: IChar, userid: string) {
    console.log("addNewCharacter called, wowUser defined:", !!wowUser);
    await connectToDb();
    try {
        console.log("Before using wowUser:", !!wowUser);

        const user = await wowUser.findOne({ userid: userid });
        if (!user) {
            return { chars: null, error: new CustomError("User doesn't exist", 400) }
        }

        user.chars.push(newCharacter);
        const updatedUser = await user.save();

        console.log('updatedUser', updatedUser)
        return { chars: user.chars, error: null };
    }
    catch (e) {
        return { chars: null, error: new CustomError("Char creation error", 400, e) }
    }

}