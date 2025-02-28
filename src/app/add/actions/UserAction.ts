'use server';

import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import { v4 as uuidv4 } from 'uuid';

export async function createNewUserAction(userId: string, userName: string) {
    console.log("inside route")

    await connectToDb();
    try {
        const newUser = new wowUser({ userid: userId, name: userName, chars: [], createdAt: Date.now(), wowTokens: [] });
        console.log('created', newUser.toJSON())
        await newUser.save();

        return JSON.stringify(newUser)
    }
    catch (e) {
        console.log('e', e)
        return "User creation error"
    }
}


export async function findUserAction(userId: string) {

    await connectToDb();
    try {
        const user = await wowUser.find({ id: userId });

        if (!user) return "User doesn't exist"
        return JSON.stringify(user)
    }
    catch (e) {

        return "User doesn't exist"
    }
}