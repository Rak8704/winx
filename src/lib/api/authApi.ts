// src/lib/api/authApi.ts
const BASE_URL = process.env.GAMEXA_BASE_URL || 'https://api.gamexaglobal.com';

export interface LoginPayload {
  agent_code: string;
  password: string;
}

export interface AgentInfo {
  id: number;
  agent_code: string;
  name: string;
  email: string;
  role: string;
  balance: number;
}

export interface AuthResponse {
  token: string;
  agent: AgentInfo;
}

// Authenticate agent
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Login failed: ${text}`);
  }

  return await res.json();
}

// Get current agent info
export async function me(token: string) {
  const res = await fetch(`${BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch agent info failed: ${text}`);
  }

  return await res.json();
}
