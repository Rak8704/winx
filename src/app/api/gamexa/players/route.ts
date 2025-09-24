import { NextRequest, NextResponse } from "next/server";
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

// ---------------- POST: Create Player ----------------
export async function POST(req: NextRequest) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.username || !body.full_name || !body.phone || !body.password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: username, full_name, phone, password" },
        { status: 400 }
      );
    }

    console.log("Sending request to GameXA with payload:", JSON.stringify(body, null, 2));

    const gameRes = await fetch(`${GAMEXA_BASE_URL}/api/players`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await gameRes.json();
    console.log("GameXA API response:", JSON.stringify(data, null, 2));
    console.log("GameXA API status:", gameRes.status);

    // Extract GameXA player ID based on API documentation
    // GameXA returns: { "message": "Player created successfully", "player": { "id": 1, ... } }
    const gameXAPlayerId =
      data.player?.id?.toString() ||
      data.id?.toString() ||
      data.player_id?.toString() ||
      data.data?.player?.id?.toString() ||
      data.data?.id?.toString() ||
      data.data?.player_id?.toString();

    if (!gameRes.ok) {
      console.error("GameXA API error:", {
        status: gameRes.status,
        statusText: gameRes.statusText,
        response: data
      });
    }

    if (gameRes.ok && gameXAPlayerId) {
      let userUpdated = false;

      if (body.phone) {
        const userByPhone = await db.user.findUnique({ where: { phone: body.phone } });
        if (userByPhone) {
          await db.user.update({
            where: { phone: body.phone },
            data: { playerId: gameXAPlayerId, gameXAPlayerId: gameXAPlayerId },
          });
          userUpdated = true;
          console.log(`Updated user ${body.phone} with GameXA player ID: ${gameXAPlayerId}`);
        }
      }

      // If no user found by phone, try to find by email if provided
      if (!userUpdated && body.email) {
        const userByEmail = await db.user.findFirst({ where: { email: body.email } });
        if (userByEmail) {
          await db.user.update({
            where: { id: userByEmail.id },
            data: { gameXAPlayerId: gameXAPlayerId },
          });
          userUpdated = true;
          console.log(`Updated user ${body.email} with GameXA player ID: ${gameXAPlayerId}`);
        }
      }
    }

    return NextResponse.json(data, { status: gameRes.status });
  } catch (err: any) {
    console.error("Players API Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Unexpected error" }, { status: 500 });
  }
}

// ---------------- GET: Fetch Players ----------------
export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 401 });
    }

    const url = new URL(req.url);
    const params = new URLSearchParams(url.search);

    const gameRes = await fetch(`${GAMEXA_BASE_URL}/api/players?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await gameRes.json();
    return NextResponse.json(data, { status: gameRes.status });
  } catch (err: any) {
    console.error("Players API Error:", err);
    return NextResponse.json({ success: false, error: err.message || "Unexpected error" }, { status: 500 });
  }
}
