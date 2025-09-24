// src/app/api/open-game/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { convertBDTToIDR } from "@/lib/utils/currency";

const GAMEXA_BASE_URL = process.env.GAMEXA_BASE_URL || "https://api.gamexaglobal.com";
const AGENT_CODE = process.env.GAMEXA_AGENT_CODE || "";
const PASSWORD = process.env.GAMEXA_PASSWORD || "";
const GAMEXA_LANGUAGE = process.env.GAMEXA_LANGUAGE || "en";

// ==================== Helper → Get Auth Token ====================
let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAuthToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) return cachedToken;

  try {
    const res = await fetch(`${GAMEXA_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent_code: AGENT_CODE, password: PASSWORD }),
    });

    if (!res.ok) {
      console.error("Auth failed:", await res.text());
      return null;
    }

    const data = await res.json();
    cachedToken = data.token || null;
    tokenExpiry = now + 60 * 60 * 1000; // 1 ঘন্টা cache
    return cachedToken;
  } catch (err) {
    console.error("Token fetch error:", err);
    return null;
  }
}

// ==================== Types ====================
type SessionUser = {
  id: string;
  phone: string;
  name: string;
  gameXAPlayerId: string;
  wallet?: {
    balance: number;
    currency: string;
  };
};

// ==================== Launch Game ====================
export async function POST(request: NextRequest) {
  try {
    const session = (await auth()) as { user?: SessionUser };
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: { gameId: string; demo?: "0" | "1" };
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { gameId, demo = "0" } = body;
    if (!gameId) {
      return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
    }

    const playerId = session.user.gameXAPlayerId;
    if (!playerId) {
      return NextResponse.json(
        { error: "GameXA player_id not found for this user" },
        { status: 400 }
      );
    }

    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ error: "Failed to authenticate with GameXA" }, { status: 401 });
    }

    // ==================== Currency Conversion ====================
    const userBDT = session.user.wallet?.balance ?? 0;
    const convertedCurrency = convertBDTToIDR(userBDT); // BDT → IDR

    const payload = {
      agent_code: AGENT_CODE,
      player_id: playerId,
      game_uid: gameId,
      language: GAMEXA_LANGUAGE,
      device: "desktop",
      demo: demo === "1" ? "1" : "0",
      currency: "IDR", // GameXA এ IDR পাঠাচ্ছি
      amount: convertedCurrency, // যদি প্রয়োজন হয়
    };

    console.log("Launching game with payload:", payload);

    const res = await fetch(`${GAMEXA_BASE_URL}/api/games/launch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log("GameXA Launch Raw Response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Invalid JSON from GameXA", raw: text }, { status: 502 });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("Game launch error:", error);
    return NextResponse.json({ error: error.message || "Unexpected error" }, { status: 500 });
  }
}
