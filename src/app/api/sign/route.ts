import { getSign, setNewSign } from '@/app/actions/UserAction';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { sign } = await req.json();

  const result = await setNewSign(sign);
  return Response.json(result);
}

export async function GET() {
  const result = await getSign();
  return Response.json(result);
}
