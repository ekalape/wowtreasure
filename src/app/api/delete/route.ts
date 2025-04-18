import { NextRequest } from 'next/server';
import { deleteChar } from '@/app/actions/UserAction';

export async function POST(req: NextRequest) {
  const { charid } = await req.json();

  if (!charid) {
    return Response.json({ success: false, error: 'Missing charid' }, { status: 400 });
  }

  const result = await deleteChar(charid);
  return Response.json(result);
}
