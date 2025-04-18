import { getOneCharUpdate } from '@/app/actions/UserAction';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { charid } = await req.json();

  if (!charid) {
    return Response.json({ success: false, error: 'Missing charid' }, { status: 400 });
  }

  const result = await getOneCharUpdate(charid);
  return Response.json(result);
}
