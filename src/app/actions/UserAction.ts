'use server';

import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import CustomError from './CustomError';
import { CharDataType, IChar } from '@/lib/models/char.interface';
import { RangeType, WowTokenType } from '@/lib/models/user.interface';
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

export async function getAllCharsAction() {
  const session = await getServerSession();
  const email = session?.user?.email;
  await connectToDb();
  try {
    const chars = (await wowUser.findOne({ email })).chars;
    return JSON.parse(JSON.stringify(chars));
  } catch (e) {
    console.error('Error in getAllCharsAction:', e);
    return { chars: null, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function getOneCharUpdate(charid: string) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session?.user?.email;
  await connectToDb();
  try {
    const chars = (await wowUser.findOne({ email })).chars;
    const char = chars.find((char: IChar) => char.charid === charid);
    return JSON.parse(JSON.stringify({ char, error: null }));
  } catch (e) {
    console.error('Error in getting an update:', e);
    return { char: null, error: e instanceof Error ? e.message : 'Unknown error' };
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
    return JSON.parse(
      JSON.stringify({
        success: true,
        updatedChar: updateResult.chars.find((char: IChar) => char.charid === charid),
      }),
    );
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

export async function editChar(charid: string, newCharData: CharDataType) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }

  const email = session?.user?.email;
  await connectToDb();
  try {
    const user = await wowUser.findOne({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    const index = user.chars.findIndex((char: IChar) => char.charid === charid);
    if (index === -1) {
      return { success: false, error: 'Character not found' };
    }
    user.chars[index] = {
      charid: charid,
      name: newCharData.name,
      charclass: newCharData.charclass,
      server: newCharData.server,
      fraction: newCharData.fraction,
      createdAt: user.chars[index].createdAt,
      earnings: user.chars[index].earnings,
    };

    user.markModified('chars');

    await user.save();

    revalidatePath('/add');
    return { success: true };
  } catch (e) {
    console.error('Error in editChar:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function deleteChar(charid: string) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session?.user?.email;
  await connectToDb();
  try {
    const user = await wowUser.findOne({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    const characterIndex = user.chars.findIndex((char: IChar) => char.charid === charid);
    if (characterIndex === -1) {
      return { success: false, error: 'Character not found' };
    }
    user.chars.splice(characterIndex, 1);
    user.markModified('chars');
    await user.save();
    revalidatePath('/add');
    return { success: true };
  } catch (e) {
    console.error('Error in deleteChar:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function addRange(from: string, to: string, fullProfit: number) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session?.user?.email;
  await connectToDb();
  try {
    const user = await wowUser.findOne({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    user.ranges.push({ from, to, fullProfit });
    user.currentSign = to;
    user.markModified('range');
    await user.save();
    revalidatePath('/');
    return { success: true, ranges: user.ranges, error: null };
  } catch (e) {
    console.error('Error in addRange:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function getRanges(): Promise<{
  success: boolean;
  ranges?: RangeType[];
  error: string | null;
}> {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session?.user?.email;
  await connectToDb();

  try {
    const user = await wowUser.findOne({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    console.log('user.ranges inside getRanges', user.ranges);
    return { success: true, ranges: user.ranges, error: null };
  } catch (e) {
    console.error('Error in getRanges:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function getSign() {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session.user?.email;
  await connectToDb();
  try {
    const user = await wowUser.findOne({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    return { success: true, currentSign: user.currentSign, error: null };
  } catch (e) {
    console.error('Error in getRanges:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function setNewSign(newSign: string) {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session.user?.email;
  await connectToDb();
  try {
    const user = await wowUser.findOne({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    user.currentSign = newSign;
    await user.save();
    revalidatePath('/');
    return { success: true, currentSign: user.currentSign, error: null };
  } catch (e) {
    console.error('Error in setting new sign:', e);
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}
