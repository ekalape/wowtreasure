import { WowTokenType } from '@/lib/models/user.interface';
import TokenForm from './TokenForm';
import { connectToDb, wowUser } from '@/lib/services/mongoDb';
import { format } from 'date-fns/format';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    redirect('/');
  }
  const email = session?.user?.email;
  await connectToDb();
  const userTokens: WowTokenType[] = (await wowUser.findOne({ email })).wowTokens;

  const smallest = userTokens.reduce((acc, curr) => {
    return acc.price < curr.price ? acc : curr;
  });

  const largest = userTokens.reduce((acc, curr) => {
    return acc.price > curr.price ? acc : curr;
  });
  const totalCost = userTokens.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-20  mt-8 w-4/5 items-center justify-center m-auto relative'>
      <TokenForm />
      <div className='w-full lg:col-span-3 border-2 min-w-80 border-background_alt p-4 rounded-lg flex flex-col gap-3 justify-start'>
        <div className='text-foreground_alt'>
          You bought{'  '} <span className='text-blue-200 text-xl'>{userTokens.length}</span>
          {'  '}
          tokens with total of{'  '}
          <span className='text-pink-300 text-xl'>{totalCost}</span>
        </div>
        <div className='text-foreground_alt'>
          Smallest token cost:{'  '}
          <span className='text-foreground text-xl'>{format(smallest.date, 'dd MMMM (yyyy)')}</span>
          - <span className='text-pink-300 text-xl'>{smallest.price}</span>
        </div>
        <div className='text-foreground_alt'>
          Largest token cost:{'  '}
          <span className='text-foreground text-xl'>
            {format(largest.date, 'dd MMMM (yyyy)')}
          </span>- <span className='text-pink-300 text-xl'>{largest.price}</span>
        </div>
      </div>
    </div>
  );
}
