'use server';

import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import CustomError from './CustomError';

export async function createNewUserAction(userId: string) {
    console.log("inside route")

    await connectToDb();
    try {
        const newUser = new wowUser({ userid: userId, chars: [], wowTokens: [] });
        console.log('created', newUser.toJSON())
        await newUser.save();
        return newUser.toJSON()
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
            return newUser.toJSON();
        }
        return user.toJSON();
    } catch (e) {
        throw new CustomError("User creation error", 400, e);
    }
}