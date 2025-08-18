import { useEffect, useState } from 'react';

export default function TokenCost() {
  const [tcost, setTcost] = useState(0);

  useEffect(() => {
    const res = async () => {
      const response = await fetch('/api/battlenet/cb');
      if (!response.ok) {
        throw new Error('Failed to fetch token cost');
      }
      const data = await response.json();
      setTcost(data.price);
      console.log(typeof data.price);
    };
    res();
  }, []);

  return (
    <div className='border-2 border-background_alt p-2 rounded-lg '>
      Token cost:{' '}
      <span className='text-blue-400 text-2xl font-bold font-yatra'>
        {' '}
        {(tcost / 10000).toLocaleString('en-US')}
      </span>
    </div>
  );
}
