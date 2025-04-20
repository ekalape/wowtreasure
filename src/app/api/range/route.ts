import { addRange, getRanges } from '@/app/actions/UserAction';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { from, to, fullProfit } = await req.json();
  console.log('newRange', from, '-', to, fullProfit);

  const result = await addRange(from, to, fullProfit);
  return Response.json(result);
}

export async function GET() {
  const result = await getRanges();
  return Response.json(result);
}
