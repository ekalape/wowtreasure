'use server';

import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import CustomError from './CustomError';
import { IChar } from '@/lib/models/char.interface';


type NewCharFormDataType = {
    chars: IChar[] | null, error: Error | null
}

export async function createNewUserAction(userId: string) {

    await connectToDb();
    try {
        const newUser = new wowUser({ userid: userId, chars: [], wowTokens: [] });
        console.log('created', newUser.toJSON())
        await newUser.save();
        return JSON.parse(JSON.stringify(newUser));
    }
    catch (e) {
        console.log('e', e)
        throw new CustomError("User creation error", 400, e)
    }
}

export async function findUserAction(userId: string) {
    await connectToDb();
    try {
        const user = await wowUser.findOne({ userid: userId });
        if (!user) {
            const newUser = new wowUser({
                userid: userId,
                chars: [],
                wowTokens: [],
            });
            console.log('created new user', newUser.toJSON());
            await newUser.save();
            return JSON.parse(JSON.stringify(newUser));
        }
        return JSON.parse(JSON.stringify(user));
    } catch (e) {
        throw new CustomError("User creation error", 400, e);
    }
}

export async function getAllCharsAction() {
    const userid = "jhbghdvnhs53";
    await connectToDb();
    const chars = (await wowUser.findOne({ userid: userid })).chars;
    return JSON.parse(JSON.stringify(chars));
}

export async function addNewCharacter(newCharacter: IChar): Promise<NewCharFormDataType> {
    const userid = "jhbghdvnhs53";
    await connectToDb();

    try {
        const chars = (await wowUser.findOne({ userid: userid })).chars;
        chars.push(newCharacter);
        await wowUser.updateOne({ userid: userid }, { chars: chars });
        return { chars: JSON.parse(JSON.stringify(chars)), error: null }
    }
    catch (e) {
        return { chars: null, error: new CustomError("Char creation error", 400, e) }
    }

}
export async function addNewProfit(charid: string, date: string, amount: number) {
    const userid = "jhbghdvnhs53";
    await connectToDb();
    try {
        const user = await wowUser.findOne({ userid });
        if (!user) {
            return { success: false, error: "User not found" };
        }
        const characterIndex = user.chars.findIndex((char: IChar) => char.charid === charid);
        if (characterIndex === -1) {
            return { success: false, error: "Character not found" };
        }

        const updateResult = await wowUser.findOneAndUpdate(
            { userid, "chars.charid": charid }, // Условие поиска: пользователь и персонаж
            {
                $push: {
                    "chars.$.earnings": { date, amount }, // Добавляем запись в earnings нужного персонажа
                },
            },
            { success: true } // Возвращаем обновленный документ
        );
        if (!updateResult) {
            return { success: false, error: "Failed to update character earnings" };
        }
        return {
            success: true,
            // Возвращаем обновленный массив chars
        };
    }
    catch (e) {
        console.error("Error in addNewProfit:", e);
        return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
    }


}