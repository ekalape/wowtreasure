import { NextRequest } from 'next/server';
import { editChar } from '@/app/actions/UserAction';

export async function POST(req: NextRequest) {
  const { charid, newCharData } = await req.json();

  if (!charid) {
    return Response.json({ success: false, error: 'Missing charid' }, { status: 400 });
  }
  if (!newCharData) {
    return Response.json({ success: false, error: 'Missing newCharData' }, { status: 400 });
  }

  const result = await editChar(charid, newCharData);
  return Response.json(result);
}
