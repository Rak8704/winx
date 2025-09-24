import { NextRequest } from 'next/server';

const GAMEXA_BASE_URL = process.env.GAMEXA_BASE_URL || 'https://api.gamexaglobal.com';
const HALL_KEY = process.env.GAMEXA_AGENT_CODE || 'AG1756047904571CVP8';

export async function POST(request: NextRequest) {
  try {
    console.log('Processing login request for GameXA API');

    // Client থেকে পাঠানো body
    const body = await request.json();
    const agent_code = body.agent_code || HALL_KEY;
    const password = body.password || process.env.GAMEXA_PASSWORD || "123456";

    console.log(`Authenticating with GameXA API using agent code: ${agent_code}`);

    // GameXA API তে লগইন request পাঠানো
    const loginResponse = await fetch(`${GAMEXA_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://gamexaglobal.com',
        'Referer': 'https://gamexaglobal.com/',
      },
      body: JSON.stringify({
        agent_code,
        password,
      }),
    });

    if (!loginResponse.ok) {
      let errorText = '';
      try {
        errorText = await loginResponse.text();
      } catch (e) {
        errorText = 'Failed to read error response';
      }

      console.error(`GameXA Authentication failed: Status ${loginResponse.status}`, errorText);

      return Response.json(
        {
          success: false,
          error: `Authentication failed with status ${loginResponse.status}`,
          message: errorText,
        },
        { status: loginResponse.status }
      );
    }

    const data = await loginResponse.json();
    console.log('Authentication successful, token received');

    // সফল হলে token ফেরত দেবে
    return Response.json(
      {
        success: true,
        token: data.token,
        expires_in: data.expires_in || null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Auth API Error:', error);
    return Response.json(
      {
        success: false,
        error: error.message || 'An error occurred while processing your request',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
