// src/app/api/gamexa/games/providers/[providerCode]/route.ts
import { NextRequest } from 'next/server';

const BASE_URL = process.env.GAMEXA_BASE_URL || 'https://api.gamexaglobal.com';
const AGENT_CODE = process.env.GAMEXA_AGENT_CODE!;
const PASSWORD = process.env.GAMEXA_PASSWORD!;

async function getAuthToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agent_code: AGENT_CODE,
      password: PASSWORD,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to authenticate with GameXA API');
  }

  const data = await res.json();
  return data.token;
}

export async function GET(req: NextRequest, { params }: { params: { providerCode: string } }) {
  try {
    const { providerCode } = params;
    
    if (!providerCode) {
      return new Response(
        JSON.stringify({ success: false, error: 'Provider code is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const token = await getAuthToken();

    // Get query parameters for pagination and filtering
    const url = new URL(req.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '100';
    const status = url.searchParams.get('status') || 'active';

    const res = await fetch(`${BASE_URL}/api/games/provider/${providerCode}?page=${page}&limit=${limit}&status=${status}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return new Response(
        JSON.stringify({ success: false, error: errorText }),
        {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, ...data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('GET /api/gamexa/games/provider/{providerCode} error:', error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}