'use server';

import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import CustomError from './CustomError';
import { IChar } from '@/lib/models/char.interface';
import { WowTokenType } from '@/lib/models/user.interface';
import { revalidatePath } from 'next/cache';


type NewCharFormDataType = {
    chars: IChar[] | null, error: Error | null
}


export async function findUserAction(userId: string) {
    /*await connectToDb();*/
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
    try {
        const chars = (await wowUser.findOne({ userid: userid })).chars;
        return JSON.parse(JSON.stringify(chars));
    } catch (e) {
        console.error("Error in getAllCharsAction:", e);
        return { chars: null, error: e instanceof Error ? e.message : "Unknown error" };
    }


}

export async function addNewCharacter(newCharacter: IChar): Promise<NewCharFormDataType> {
    const userid = "jhbghdvnhs53";
    /*await connectToDb();*/

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
            { userid, "chars.charid": charid },
            {
                $push: {
                    "chars.$.earnings": { date, amount },
                },
            },
            { success: true }
        );
        if (!updateResult) {
            return { success: false, error: "Failed to update character earnings" };
        }
        revalidatePath('/add')
        return {
            success: true,
        };
    }
    catch (e) {
        console.error("Error in addNewProfit:", e);
        return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
    }


}


export async function addNewTokenAmount(tokenAmount: number, date: string) {
    const userid = "jhbghdvnhs53";
    /*await connectToDb();*/
    try {
        const userTokens: WowTokenType[] = (await wowUser
            .findOne({ userid })).wowTokens

        if (!userTokens) {
            return { success: false, error: "User not found" };
        }
        userTokens.push({ date, price: tokenAmount });
        await wowUser.updateOne({ userid: userid }, { wowTokens: userTokens });
        revalidatePath('/wwtoken')
        return { success: true };
    } catch (e) {
        console.error("Error in addNewTokenAmount:", e);
        return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
    }
}