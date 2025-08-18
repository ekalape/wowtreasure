import { LoaderHoriz } from '@/components/Loader/LoaderHoriz';
import { useEffect, useState } from 'react';

export default function TokenCost() {
  const [price, setPrice] = useState<number | null>(null);

  const [direction, setDirection] = useState<'up' | 'down' | 'same' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wowwTtokenPprice');
    let savedPrice: number | null = null;
    if (saved) {
      const parsed = JSON.parse(saved);
      savedPrice = parsed.price;
      setPrice(parsed.price);
    }
    console.log('saved', saved);

    const res = async () => {
      try {
        const response = await fetch('/api/battlenet/cb');
        if (!response.ok) {
          throw new Error('Failed to fetch token cost');
        }
        const data = await response.json();
        if (savedPrice !== null) {
          if (data.price > savedPrice) setDirection('up');
          else if (data.price < savedPrice) setDirection('down');
          else setDirection('same');
        }

        setPrice(data.price);
        localStorage.setItem('wowwTtokenPprice', JSON.stringify({ price: data.price }));
        console.log(data.price);
      } catch (error) {
        console.error('Error fetching token cost:', error);
      }
    };
    res();
  }, []);

  return (
    <div className='border-2 border-background_alt p-2 rounded-lg '>
      {price ? (
        <>
          <span>Token cost: </span>
          <div>
            <span className='text-blue-400 text-2xl font-bold font-yatra'>
              {' '}
              {(price / 10000).toLocaleString('en-US')}
            </span>{' '}
            {direction === 'up' && <span className='text-red-500'>▲</span>}
            {direction === 'down' && <span className='text-green-500'>▼</span>}
            {direction === 'same' && <span className='text-gray-400'>—</span>}
          </div>
        </>
      ) : (
        <LoaderHoriz />
      )}
    </div>
  );
}
