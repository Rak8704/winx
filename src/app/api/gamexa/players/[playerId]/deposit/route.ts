import { NextRequest } from "next/server";
import { db } from "@/lib/db";

const GAMEXA_BASE_URL = process.env.GAMEXA_BASE_URL || "https://api.gamexaglobal.com";
const AGENT_CODE = process.env.GAMEXA_AGENT_CODE || "AG1756047904571CVP8";
const PASSWORD = process.env.GAMEXA_PASSWORD || "123456";

// Helper → Auth token
async function getAuthToken(): Promise<string | null> {
  try {
    const res = await fetch(`${GAMEXA_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent_code: AGENT_CODE, password: PASSWORD }),
    });

    if (!res.ok) {
      console.error("Failed login response:", await res.text());
      return null;
    }

    const data = await res.json();
    return data.token || null;
  } catch (err) {
    console.error("Token fetch error:", err);
    return null;
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { playerId: string } }
) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return Response.json({ success: false, error: "Authentication failed" }, { status: 401 });
    }

    // Map local database ID to GameXA player ID if needed
    let gameXAPlayerId = params.playerId;
    
    // Check if the provided player_id is a local database ID (CUID format)
    // If so, look up the GameXA player ID in the database
    if (!/^\d+$/.test(params.playerId)) {
      const user = await db.user.findUnique({
        where: { id: params.playerId },
        select: { gameXAPlayerId: true }
      });
      
      if (user && user.gameXAPlayerId) {
        gameXAPlayerId = user.gameXAPlayerId;
      } else {
        return Response.json({ success: false, error: "GameXA player ID not found for user" }, { status: 400 });
      }
    }

    const body = await req.json();
    
    const gameRes = await fetch(`${GAMEXA_BASE_URL}/api/players/${gameXAPlayerId}/deposit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await gameRes.json();
    
    return Response.json(data, { status: gameRes.status });
  } catch (err: any) {
    console.error("Deposit API Error:", err);
    return Response.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}