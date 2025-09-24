
import { GAMEXA_CONFIG, GAMEXA_HEADERS } from "@/lib/constants/gamexa";

export interface PlayerData {
  username?: string;
  password?: string;
  currency?: string;
  language?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

// ==================== Player Management ====================
export const createPlayer = async (playerData: PlayerData) => {
  // API expects IDR, user sees BDT 

  const apiCurrency = "IDR"; 

const fullName =
    (playerData?.first_name || "First") + " " + (playerData?.last_name || "Last");

  const defaultData = {
    username:
      playerData?.username && playerData.username.trim() !== ""
        ? playerData.username
        : playerData?.email && playerData.email.trim() !== ""
        ? playerData.email.split("@")[0]
        : playerData?.phone
        ? "user_" + playerData.phone
        : "guest_" + Date.now(), // fallback
    password: playerData?.password || "StrongPassword123!",
    currency: apiCurrency, // API-compatible
    language: playerData?.language || "en",
    email: playerData?.email || "",
    phone: playerData?.phone || "",
    full_name: fullName, // ✅ GameXA required

  };

  try {
    console.log("Creating player with data:", defaultData);
    const res = await fetch("/api/gamexa/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Player create HTTP error:", res.status, errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log("🎯 createPlayer response:", data);

    if (!data.player_id && !data.id) {
      throw new Error("Player creation failed: No player ID returned");
    }

    return data;
  } catch (error) {
    console.error("Player create error:", error);
    throw error;
  }
};
// ==================== Launch Game ====================
export const launchGameService = async (player_id: string, game_id: string) => {
  try {
    console.log("Launching game with player_id:", player_id, "game_id:", game_id);
    const res = await fetch("/api/gamexa/games/launch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_id, game_uid: game_id }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Launch game HTTP error:", res.status, errorText);
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log("🎯 launchGame response:", data);

    return data;
  } catch (error) {
    console.error("Launch game error:", error);
    throw error;
  }
};

// ==================== Helper ====================
export const isGameXAGameCheck = (gameId: string) => {
  return gameId.includes("_") || /^[A-Z]+_/.test(gameId);
};

// ==================== Launch Game from any API ====================
export const launchGameFromAnyAPI = async (
  gameId: string,
  playerId: string,
  openGameMutation?: any
) => {
  console.log("launchGameFromAnyAPI called with:", { gameId, playerId });

  if (!gameId?.trim()) throw new Error("Game ID is required to launch a game");
  if (!playerId?.trim()) throw new Error("Player ID is required to launch a game");

  try {
    if (isGameXAGameCheck(gameId)) {
      console.log("Launching GameXA game with playerId:", playerId, "gameId:", gameId);
      const response = await launchGameService(playerId, gameId);
      console.log("GameXA launch response:", response);

      if (response && response.success) {
        return {
          content: {
            game: {
              url: response.game_launch_url,
              iframe: "1",
              sessionId: response.session_id,
            },
          },
        };
      }

      throw new Error("Failed to launch GameXA game: " + (response.message || "Unknown error"));
    } else if (openGameMutation) {
      console.log("Launching non-GameXA game with gameId:", gameId);
      const response = await openGameMutation({ gameId }).unwrap();
      console.log("Non-GameXA launch response:", response);

      if (response && response.success && response.game_launch_url) {
        return {
          content: {
            game: {
              url: response.game_launch_url,
              iframe: "1",
              sessionId: response.session_id,
            },
          },
        };
      }

      return response;
    } else {
      throw new Error("Non-GameXA game launch requires openGameMutation function");
    }
  } catch (error) {
    console.error("Error launching game:", error);
    throw error;
  }
};
