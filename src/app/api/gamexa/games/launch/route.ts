import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { convertBDTToIDR } from "@/lib/utils/currency";

const GAMEXA_BASE_URL = process.env.GAMEXA_BASE_URL || "https://api.gamexaglobal.com";
const AGENT_CODE = process.env.GAMEXA_AGENT_CODE || "";
const PASSWORD = process.env.GAMEXA_PASSWORD || "";
const GAMEXA_LANGUAGE = process.env.GAMEXA_LANGUAGE || "en";

// ==================== Helper → Auth Token ====================
async function getAuthToken(): Promise<string | null> {
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
    return data.token || null;
  } catch (err) {
    console.error("Token fetch error:", err);
    return null;
  }
}

// ==================== POST → Launch Game ====================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { player_id, game_uid } = body;

    if (!player_id || !game_uid) {
      return NextResponse.json({ success: false, error: "player_id and game_uid are required" }, { status: 400 });
    }

    // ==================== Fetch User from DB ====================
    let gameXAPlayerId = player_id;
    let bdtBalance = 0;

    if (!/^\d+$/.test(player_id)) {
      const user = await db.user.findUnique({
        where: { id: player_id },
        select: { gameXAPlayerId: true, playerId: true, wallet: { select: { balance: true } } },
      });

      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 400 });
      }

      gameXAPlayerId = user.gameXAPlayerId || user.playerId;

      // ✅ Decimal → number conversion
      bdtBalance = user.wallet?.balance?.toNumber() ?? 0;
    }

    // ==================== Convert BDT → IDR ====================
    const idrBalance = convertBDTToIDR(bdtBalance);

    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication failed with GameXA API" }, { status: 401 });
    }

    const payload = {
      agent_code: AGENT_CODE,
      player_id: gameXAPlayerId,
      game_uid,
      language: GAMEXA_LANGUAGE,
      device: "desktop",
      demo: body.demo === "1" ? "1" : "0",
      currency: "IDR", // ✅ Always send IDR
      balance: idrBalance, // optional, can be used if needed
    };

    console.log("Launching game with payload:", payload);

    const gameRes = await fetch(`${GAMEXA_BASE_URL}/api/games/launch`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });

    const text = await gameRes.text();
    console.log("GameXA launch response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid JSON from GameXA", raw: text }, { status: 502 });
    }

    return NextResponse.json(data, { status: gameRes.status });
  } catch (err: any) {
    console.error("Game Launch API Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Unexpected error" }, { status: 500 });
  }
}
