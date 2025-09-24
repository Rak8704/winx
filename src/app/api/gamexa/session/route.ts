// src/app/api/gamexa/session/route.ts

import { NextResponse } from "next/server";

const GAMEXA_BASE_URL = "https://api.gamexaglobal.com";

export async function POST(req: Request) {
  try {
    const { player_id, game_uid } = await req.json();

    const response = await fetch(`${GAMEXA_BASE_URL}/api/games/launch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GAMEXA_BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        player_id,
        game_uid,
        lobby_url: "https://casino.gamexaglobal.com",
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("GameXA API Error:", error);
    return NextResponse.json(
      { error: "Failed to launch game", details: error.message },
      { status: 500 }
    );
  }
}
