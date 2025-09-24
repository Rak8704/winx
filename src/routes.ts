/**
 * all about auth routes
 * for only unauthorized users
 * @type {string[]}
 */
export const authRoutes = ["/register", "/login", "/forget-password"];

/**
 * public routes
 * can be access without login or with login
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/slots",
  "/card-x",
  "/pocker",
  "/roulette",
  "/favorites",
  "/table",
  "/fish",
  "/lottery",
  "/play",
  "/api/open-game",
  "/api/game/32328e87f8592ed205bbaa065dbacce4",
  "/api/gamexa-proxy",
  "/api/gamexa/players",
  "/api/gamexa/games",
  "/api/gamexa/games/launch",
  "/live-casino",
  "/promotion",
  "/hot",
  "/api/durantopay/deposit",
  "/api/durantopay/withdraw",
  "/api/durantopay/callback",
  "/api/durantopay/query",
  "/api/durantopay/test",
  "/api/deposit/payment/methods",
  "/api/deposit",
  "/api/withdraw",
  "/games",
  "/sports",
  "/manual",
  "/vip",
  "/mission",
  "/languages",
  "/appp",
  "/chat",
  "/pvp",

];

/**
 * The prefix for api authentication routes
 * @type {string}
 */
export const apiAuthRoutePrefix = "/api";

/**
 * The prefix for provider api endpoints
 * @type {string}
 */
export const providerApiPrefix = "/api/provider";
