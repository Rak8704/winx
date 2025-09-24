export const GAMEXA_CONFIG = {
  BASE_URL: process.env.GAMEXA_BASE_URL || "https://api.gamexaglobal.com",
  OPEN_GAME_URL: process.env.GAMEXA_OPEN_GAME_URL || "https://jsgame.live/game/launch",
  HALL_ID: process.env.HALL_ID || "TBS0001",
  AGENT_CODE: process.env.GAMEXA_AGENT_CODE || "AG1756047904571CVP8",
  PASSWORD: process.env.GAMEXA_PASSWORD || "123456",
  BEARER_TOKEN: process.env.GAMEXA_BEARER_TOKEN || "YOUR_BEARER_TOKEN"
};

// GameXA API Headers
export const GAMEXA_HEADERS = {
  "Content-Type": "application/json",
  "Origin": "https://gamexaglobal.com",
  "Referer": "https://gamexaglobal.com/"
};
