// src/lib/api/gamexaApi.ts
import axios from "axios";

// ==================== Config ====================
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== Interfaces ====================
export interface GameXAAuthResponse {
  token: string;
  agent: {
    id: number;
    agent_code: string;
    name: string;
    email: string;
    role: string;
    balance: number;
  };
}

export interface GameXAGame {
  id: number;
  game_uid: string;
  game_name: string;
  provider_id: number;
  game_type: string;
  status: string;
  image_url: string;
  min_bet: number;
  max_bet: number;
  rtp: number;
  volatility: string;
  provider_code: string;
  provider_name: string;
  provider_logo: string;
  created_at: string;
  updated_at: string;
}

export interface GameXAGamesResponse {
  success: boolean;
  games: GameXAGame[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    search: string | null;
    provider: string | null;
    type: string | null;
    status: string;
  };
}

export interface GameXALaunchResponse {
  success: boolean;
  game_launch_url: string;
  session_id: string;
}

export interface AppGameFormat {
  id: string;
  name: string;
  img: string;
  device: string;
  title: string;
  categories: string;
  bm: string;
  demo: string;
  rewriterule: string;
  exitButton: string;
}

// ==================== Auth ====================
let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function loginToGameXA(): Promise<string> {
  const now = Date.now();
  if (cachedToken && tokenExpiry && now < tokenExpiry) return cachedToken;

  try {
    const response = await api.post("api/gamexa/auth", {
      agent_code: process.env.GAMEXA_AGENT_CODE,
      password: process.env.GAMEXA_PASSWORD,
    });

    const token = response.data.token;
    cachedToken = token;
    tokenExpiry = now + 3600 * 1000; // 1 ঘন্টা cache
    return token;
  } catch (err: any) {
    console.error("Login failed:", err.message);
    throw new Error("Failed to login to GameXA");
  }
}

// ==================== Games ====================
export async function fetchAllGames(params: { search?: string } = {}): Promise<GameXAGamesResponse> {
  const response = await api.get("/api/gamexa/games", {
    params: { limit: 6648, status: "active", ...params },
  });
  return response.data;
}

export function convertGameXAToAppFormat(gamexaGames: GameXAGamesResponse): AppGameFormat[] {
  if (!gamexaGames?.games) return [];

  const providerCodeMap: Record<string, string> = {
    EVOLUTION: "evolution",
    FAST_GAMES: "fast_games",
    JILI: "jili_gaming",
    MICROGAMING: "microgaming_slot",
    NETENT: "NetEnt",
    PGSOFT: "pgsoft_slot",
    PLAYNGO: "playngo",
    REDTIGER: "red_tiger",
    SPORT_BETTING: "sport_betting",
    AINSWORTH: "ainsworth",
    AMATIC: "amatic",
    AMIGO_GAMING: "amigo_gaming",
    APEX: "apex",
    APOLLO: "apollo",
    ARISTOCRAT: "aristocrat",
    BINGO: "bingo",
    BOOMING: "booming",
    EGAMING: "egaming",
    EGT: "egt",
    FIREKIRIN: "firekirin",
    FISH: "fish",
    GOLDENRACE: "goldenrace",
    HABANERO: "habanero_slot",
    IGROSOFT: "igrosoft",
    IGT: "igt",
    KAJOT: "kajot",
    KENO: "keno",
    MANCALA: "mancala",
    MERKUR: "merkur",
    NOVOMATIC: "novomatic",
    PRAGMATIC: "pragmatiplay_slot",
    QUICKSPIN: "quickspin",
    ROULETTE: "roulette",
    RUBYPLAY: "rubyplay",
    SCIENTIFIC_GAMES: "scientific_games",
    TABLE_GAMES: "table_games",
    VEGAS: "vegas",
    WAZDAN: "wazdan",
    ZITRO: "zitro",
    CQ9: "cq9_slot",
    SEXYGAMING: "sexygaming",
    PLAYTECH: "playtech_slot",
    EPICWIN: "epicwin",
    RELAX_GAMING: "relax_gaming",
    TURBOGAMES: "turbogames",
    SKYWIND: "skywind",
    HACKSAW: "hacksaw",
    TADA_GAMING: "tada_gaming",
    B_GAMING: "bgaming",
    KM: "km",
    EZUGI: "ezugi",
    SMARTSOFT: "smartsoft",
    BTGAMING: "btgaming",
    "2J": "2j",
    "5G": "5g",
    PGSGAMING: "pgsgaming",
    GAME_ART: "game_art",
    ONEGAMING: "onegaming",
    INOUT: "inout",
    AG: "ag",
    EAZY_GAMING: "eazy_gaming",
    IDEAL: "ideal",
    KOOLBET: "koolbet",
    FACHAI: "fachai",
    NOLIMITCITY: "nolimitcity",
    BIG_TIME_GAMING: "big_time_gaming",
    ASTAR: "astar",
    MINI: "mini",
    GALAXSYS: "galaxsys",
    SPRIBE: "spribe",
    V8: "v8",
    JDB_GAMING: "jdb_gaming",
    T1: "t1",
    YEEBET: "yeebet",
    WONWON: "wonwon",
    PIX: "pix",
    B_FLOTTOBIIT: "bflottobiit",
    BTI: "bti",
    DPESPORTSGAMING: "dpesportsgaming",
    DPSPORTSGAMING: "dpsportsgaming",
    DREAMGAMING: "dreamgaming",
    LUCKYSPORTGAMING: "luckysportgaming",
    ONGAMING: "ongaming",
  };

  return gamexaGames.games.map((game: GameXAGame) => {
    let category: string;
    switch (game.game_type) {
      case "slot": category = "slots"; break;
      case "table":
      case "card": category = "live_dealers"; break;
      case "lottery": category = "lottery"; break;
      case "sports": category = "sport"; break;
      case "poker":  
      case "video_poker": category = "video_poker"; break;
      case "fishing": category = "fishing"; break;
      default: category = "slots";
    }

    const title = providerCodeMap[game.provider_code.toUpperCase()] || game.provider_code.toLowerCase();

    return {
      id: game.game_uid,
      name: game.game_name,
      img: game.image_url,
      device: "mobile,desktop",
      title: title,
      categories: category,
      bm: "0",
      demo: "1",
      rewriterule: "0",
      exitButton: "1",
    };
  });
}

// ==================== Player Management ====================
export async function createPlayer(data: {
  username: string;
  email?: string;
  full_name : string; // ✅ full_name directly support
  first_name?: string; // optional
  last_name?: string;  // optional
  phone: string;
  password: string;
  currency?: string;
}) {
  try {
    // Build payload properly - don't overwrite full_name if it's already provided
    const payload = { 
      ...data,
      // Only construct full_name from first_name + last_name if full_name is not provided
      full_name: data.full_name || `${data.first_name || ''} ${data.last_name || ''}`.trim()
    };
    
    console.log("GameXA createPlayer payload:", payload); // ✅ debug payload
    const response = await api.post("api/gamexa/players", payload);
    console.log("GameXA createPlayer response:", response.data); // ✅ debug response

    return response.data;
  } catch (error: any) {
    console.error("Error creating player in GameXA API:", error.response?.data || error.message);
    throw error;
  }
}

export async function getAllPlayers(query?: { page?: number; limit?: number; search?: string; status?: string }) {
  const params = new URLSearchParams();
  if (query?.page) params.append('page', query.page.toString());
  if (query?.limit) params.append('limit', query.limit.toString());
  if (query?.search) params.append('search', query.search);
  if (query?.status) params.append('status', query.status);

  const response = await api.get(`api/gamexa/players?${params.toString()}`);
  return response.data;
}

// ==================== Transactions ====================
export async function depositToPlayer(playerId: string, amount: number, referenceId: string) {
  try {
    const response = await api.post(`api/gamexa/players/${playerId}/deposit`, { amount, reference_id: referenceId });
    return response.data;
  } catch (error: any) {
    console.error("Error depositing to player:", error.response?.data || error.message);
    throw error;
  }
}

export async function withdrawFromPlayer(playerId: string, amount: number) {
  try {
    const response = await api.post(`api/gamexa/players/${playerId}/withdraw`, { amount });
    return response.data;
  } catch (error: any) {
    console.error("Error withdrawing from player:", error.response?.data || error.message);
    throw error;
  }
}

// ==================== Converter ====================
export function convertBDTToIDR(amount: number): number {
  const rate = 230; // 1 BDT = 230 IDR (example)
  return amount * rate;
}

// ==================== Game Launch ====================
export async function launchGame(playerId: string, gameUid: string, lobbyUrl?: string) {
  try {
    const response = await api.post("/api/gamexa/games/launch", {
      player_id: playerId,
      game_uid: gameUid,
      lobby_url: lobbyUrl
    });
    return response.data;
  } catch (error: any) {
    console.error("Error launching game in GameXA API:", error.response?.data || error.message);
    throw error;
  }
}
