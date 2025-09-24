// src/app/api/transactions/route.ts
import { NextRequest } from 'next/server';

const BASE_URL = process.env.GAMEXA_BASE_URL || 'https://api.gamexaglobal.com';
const AGENT_CODE = process.env.GAMEXA_AGENT_CODE!;
const PASSWORD = process.env.GAMEXA_PASSWORD!;

async function getAuthToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agent_code: AGENT_CODE, password: PASSWORD }),
  });

  if (!res.ok) throw new Error('Failed to authenticate with GameXA API');

  const data = await res.json();
  return data.token;
}

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken();
    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);

    // যদি stats route হয়: /api/transactions?stats=true
    const isStats = params.get('stats') === 'true';
    let apiUrl = `${BASE_URL}/api/transactions`;

    if (isStats) {
      apiUrl += '/stats';
      // Stats route শুধুমাত্র start_date & end_date পাঠাবে
      const statsParams = new URLSearchParams();
      const startDate = params.get('start_date');
      const endDate = params.get('end_date');
      if (startDate) statsParams.append('start_date', startDate);
      if (endDate) statsParams.append('end_date', endDate);
      apiUrl += `?${statsParams.toString()}`;
    } else {
      apiUrl += `?${params.toString()}`;
    }

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return new Response(JSON.stringify({ success: false, error: errorText }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify({ success: true, ...data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('GET /api/transactions error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
