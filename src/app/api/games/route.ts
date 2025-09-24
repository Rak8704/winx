import { NextRequest } from "next/server";

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

export async function GET(req: NextRequest) {
  try {
    const token = await getAuthToken();
    if (!token) {
      return Response.json({ success: false, error: "Authentication failed" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "100";
    const status = searchParams.get("status") || "active";
    const search = searchParams.get("search") || searchParams.get("q") || searchParams.get("query") || "";

    // Build query string with all parameters
    const queryParams = new URLSearchParams({
      limit,
      status,
    });
    
    // Add search parameter if provided and not undefined
    if (search && search !== "undefined") {
      queryParams.append("search", search);
    }

    console.log("Fetching games from GameXA with URL:", `${GAMEXA_BASE_URL}/api/games?${queryParams.toString()}`);
    console.log("GameXA API request headers:", { Authorization: `Bearer ${token}`, "Content-Type": "application/json" });
    const gameRes = await fetch(`${GAMEXA_BASE_URL}/api/games?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const text = await gameRes.text();
    const contentType = gameRes.headers.get("content-type");
    console.log("GameXA API response status:", gameRes.status);
    console.log("GameXA API response headers:", Object.fromEntries(gameRes.headers.entries()));
    console.log("GameXA API response text:", text);

    // যদি JSON না আসে, console log এবং error return
    if (!contentType?.includes("application/json")) {
      console.error("Expected JSON but got:", text);
      return Response.json(
        { success: false, error: "Unexpected response from GameXA", raw: text },
        { status: 502 }
      );
    }

    const data = JSON.parse(text);

    return Response.json(
      { success: true, games: data.games || [], pagination: data.pagination || {} },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Games API Error:", err);
    return Response.json(
      { success: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
