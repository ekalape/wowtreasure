import { NextResponse } from 'next/server';

const BNET_OAUTH_URL = 'https://oauth.battle.net/token';

let cachedToken: { token: string; expiresAt: number } | null = null;
/* let cachedCommodities: { data: any; expiresAt: number } | null = null; */

async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && cachedToken.expiresAt > now) {
    console.log('Using cached token');
    return cachedToken.token;
  }
  console.log('Fetching new access token');
  const res = await fetch(BNET_OAUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.BNET_CLIENT_ID!,
      client_secret: process.env.BNET_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to get access token: ${res.statusText}`);
  }

  const { access_token } = await res.json();

  cachedToken = {
    token: access_token,
    expiresAt: now + 10 * 60 * 1000,
  };

  return access_token;
}
export async function GET() {
  try {
    const access_token = await getAccessToken();

    const commoditiesUrl = `https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=en_US`;

    const commoditiesRes = await fetch(commoditiesUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!commoditiesRes.ok) {
      throw new Error(`Failed to fetch commodities: ${commoditiesRes.statusText}`);
    }

    const data = await commoditiesRes.json();

    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage });
  }
}
