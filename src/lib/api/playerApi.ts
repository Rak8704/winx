// src/lib/api/playerApi.ts
const BASE_URL = process.env.GAMEXA_BASE_URL || 'https://api.gamexaglobal.com';

export interface PlayerPayload {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone: string;
  currency: string;
}

export interface TransactionPayload {
  amount: number;
  reference_id: string;
}

// Create new player
export async function createPlayer(token: string, payload: PlayerPayload) {
  const res = await fetch(`${BASE_URL}/api/players`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create player: ${text}`);
  }

  return await res.json();
}

// Get all players
export async function getAllPlayers(token: string, query?: { page?: number; limit?: number; search?: string; status?: string }) {
  const params = new URLSearchParams();
  if (query?.page) params.append('page', query.page.toString());
  if (query?.limit) params.append('limit', query.limit.toString());
  if (query?.search) params.append('search', query.search);
  if (query?.status) params.append('status', query.status);

  const res = await fetch(`${BASE_URL}/api/players?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch players: ${text}`);
  }

  return await res.json();
}

// Get player balance
export async function getPlayerBalance(token: string, playerId: number) {
  const res = await fetch(`${BASE_URL}/api/players/${playerId}/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get balance: ${text}`);
  }

  return await res.json();
}

// Deposit
export async function deposit(token: string, playerId: number, payload: TransactionPayload) {
  const res = await fetch(`${BASE_URL}/api/players/${playerId}/deposit`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Deposit failed: ${text}`);
  }

  return await res.json();
}

// Withdraw
export async function withdraw(token: string, playerId: number, payload: TransactionPayload) {
  const res = await fetch(`${BASE_URL}/api/players/${playerId}/withdraw`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Withdraw failed: ${text}`);
  }

  return await res.json();
}

// Player transactions
export async function getPlayerTransactions(token: string, playerId: number, query?: { page?: number; limit?: number; type?: string }) {
  const params = new URLSearchParams();
  if (query?.page) params.append('page', query.page.toString());
  if (query?.limit) params.append('limit', query.limit.toString());
  if (query?.type) params.append('type', query.type);

  const res = await fetch(`${BASE_URL}/api/players/${playerId}/transactions?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get transactions: ${text}`);
  }

  return await res.json();
}
