'use server';

import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import CustomError from './CustomError';
import { IChar } from '@/lib/models/char.interface';
import { WowTokenType } from '@/lib/models/user.interface';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type NewCharFormDataType = {
  chars: IChar[] | null;
  error: Error | null;
};

export async function findUserAction(email: string) {
  await connectToDb();
  try {
    const user = await wowUser.findOne({ email });
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return JSON.parse(JSON.stringify(user));
  } catch (e) {
    throw new CustomError('User not found', 404, e);
  }
}

export async function createNewUserAction(email: string, password: string, username?: string) {
  await connectToDb();
  try {
    const user = await wowUser.findOne({ email });
    if (user) {
      throw new CustomError('User already exists', 400);
    }
    const name = username || email.split('@')[0];
    const newUser = new wowUser({
      email,
      password,
      name,
      chars: [],
      wowTokens: [],
    });
    console.log('created new user', newUser.email, 'name - ', newUser.name);
    await newUser.save();
    return JSON.parse(
      JSON.stringify({
        email: newUser.email,
        name: newUser.name,
        chars: newUser.chars,
        wowTokens: newUser.wowTokens,
      }),
    );
  } catch (e) {
    throw new CustomError('User creation error', 400, e);
  }
}

/* export async function findUserAction(userId: string) {
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
} */

export async function getAllCharsAction() {
  const session = await getServerSession();
  /*   if (!session) {
    redirect('/');
  } */
  console.log('session inside getAllCharsAction ----> ', session);
  const email = session?.user?.email;
  await connectToDb();
  try {
    const chars = (await wowUser.findOne({ email })).chars;
    console.log('chars inside getAllCharsAction ----> ', chars);
    return JSON.parse(JSON.stringify(chars));
  } catch (e) {
    console.error('Error in getAllCharsAction:', e);
    return { chars: null, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function addNewCharacter(newCharacter: IChar): Promise<NewCharFormDataType> {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session?.user?.email;
  await connectToDb();

  try {
    const chars = (await wowUser.findOne({ email })).chars;
    chars.push(newCharacter);
    await wowUser.updateOne({ email }, { chars: chars });
    return { chars: JSON.parse(JSON.stringify(chars)), error: null };
  } catch (e) {
    return { chars: null, error: new CustomError('Char creation error', 400, e) };
  }
}
export async function addNewProfit(charid: string, date: string, amount: number) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session?.user?.email;
  try {
    const user = await wowUser.findOne({ email });
    console.log('user inside useraction-----> ', JSON.stringify(user));
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    const characterIndex = user.chars.findIndex((char: IChar) => char.charid === charid);
    if (characterIndex === -1) {
      return { success: false, error: 'Character not found' };
    }

    const updateResult = await wowUser.findOneAndUpdate(
      { email, 'chars.charid': charid },
      {
        $push: {
          'chars.$.earnings': { date, amount },
        },
      },
      { success: true },
    );
    if (!updateResult) {
      return { success: false, error: 'Failed to update character earnings' };
    }
    revalidatePath('/add');
    return {
      success: true,
    };
  } catch (e) {
    console.error('Error in addNewProfit:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function addNewTokenAmount(tokenAmount: number, date: string) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

  const email = session?.user?.email;
  await connectToDb();
  try {
    const userTokens: WowTokenType[] = (await wowUser.findOne({ email })).wowTokens;

    if (!userTokens) {
      return { success: false, error: 'User not found' };
    }
    userTokens.push({ date, price: tokenAmount });
    await wowUser.updateOne({ email }, { wowTokens: userTokens });
    revalidatePath('/wwtoken');
    return { success: true };
  } catch (e) {
    console.error('Error in addNewTokenAmount:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}
