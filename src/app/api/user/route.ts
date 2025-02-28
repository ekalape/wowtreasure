import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request) {

    await connectToDb();
    try {
        const body = await req.json();
        const { userId } = body;


        const user = await wowUser.find(userId);

        if (!user) return new Response("User doesn't exist", { status: 404 })
        return new Response(JSON.stringify(user), { status: 200 })
    }
    catch (e) {

        return new Response("User doesn't exist", { status: 404 })
    }
}

export async function POST(req: Request) {
    console.log("inside route")

    await connectToDb();
    try {
        const body = await req.json();
        const { name } = body;
        const userId = uuidv4();
        const newUser = new wowUser({ userId, name, chars: [], createdAt: Date.now(), wowTokens: [] });

        await newUser.save();

        return new Response(JSON.stringify(newUser), { status: 201 })
    }
    catch (e) {
        console.log('e', e)
        return new Response("User creation error", { status: 417 })
    }
}