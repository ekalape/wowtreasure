import { useEffect, useState } from 'react';

export default function TokenCost() {
  const [price, setPrice] = useState<number | null>(null);

  const [prevPrice, setPrevPrice] = useState(0);

  const [direction, setDirection] = useState<'up' | 'down' | 'same' | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wowwTtokenPprice');
    let savedPrice: number | null = null;
    if (saved) {
      const parsed = JSON.parse(saved);
      savedPrice = parsed.price;
      setPrevPrice(parsed.price);
    } else {
      setPrevPrice(0);
    }

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
          setPrevPrice(savedPrice);
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

  const dirSymbolClass = `flex items-center justify-center pb-2 ${
    direction === 'up' ? 'text-red-500' : direction === 'down' ? 'text-green-500' : 'text-gray-400'
  }`;

  return (
    <div className='border-2 border-background_alt p-3 rounded-lg flex flex-col justify-center items-center gap-2'>
      <span>Token cost: </span>
      <div className='flex items-center gap-2'>
        <span className='text-blue-400 text-2xl font-bold font-yatra'>
          {' '}
          {price
            ? (price / 10000).toLocaleString('de-DE', {
                useGrouping: true,
              })
            : (prevPrice / 10000).toLocaleString('de-DE', {
                useGrouping: true,
              })}
        </span>{' '}
        <span className={dirSymbolClass}>
          {direction === 'up' ? '▲' : direction === 'down' ? '▼' : <span>●</span>}
        </span>
      </div>
    </div>
  );
}
