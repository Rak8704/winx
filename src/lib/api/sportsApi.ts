/**
 * Sports API service for The Odds API
 * Uses environment variables:
 * - SPORTS_ODDS_API_KEY: The API key for The Odds API
 * - SPORTS_ODDS_API_URL: The base URL for The Odds API
 */

import { Game, GameWithScores, Sport } from "@/types/sports";

const API_KEY = process.env.SPORTS_ODDS_API_KEY || "f1eff4223b834f8c4f72687c2ea3acdd";
const BASE_URL = process.env.SPORTS_ODDS_API_URL || "https://api.the-odds-api.com/v4";

/**
 * Fetch all available sports
 * @returns Promise<Sport[]>
 */
export const fetchSports = async (): Promise<Sport[]> => {
  try {
    const response = await fetch(`${BASE_URL}/sports/?apiKey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching sports: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching sports:", error);
    throw error;
  }
};

/**
 * Fetch odds for a specific sport
 * @param sportKey The sport key
 * @param regions Regions to get odds for (default: 'us')
 * @param markets Markets to get odds for (default: 'h2h')
 * @param oddsFormat Format of odds (default: 'american')
 * @returns Promise<Game[]>
 */
export const fetchOdds = async (
  sportKey: string,
  regions: string = "us",
  markets: string = "h2h",
  oddsFormat: string = "american"
): Promise<Game[]> => {
  try {
    const url = `${BASE_URL}/sports/${sportKey}/odds/?apiKey=${API_KEY}&regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching odds: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching odds:", error);
    throw error;
  }
};

/**
 * Fetch Betfair Exchange odds for a specific sport
 * @param sportKey The sport key
 * @param markets Markets to get odds for (default: 'h2h')
 * @param oddsFormat Format of odds (default: 'american')
 * @returns Promise<Game[]>
 */
export const fetchBetfairExchangeOdds = async (
  sportKey: string,
  markets: string = "h2h",
  oddsFormat: string = "american"
): Promise<Game[]> => {
  try {
    // Betfair Exchange uses the UK region and betfair_ex_uk bookmaker key
    const url = `${BASE_URL}/sports/${sportKey}/odds/?apiKey=${API_KEY}&regions=uk&bookmakers=betfair_ex_uk&markets=${markets}&oddsFormat=${oddsFormat}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching Betfair Exchange odds: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching Betfair Exchange odds:", error);
    throw error;
  }
};

/**
 * Fetch scores for a specific sport
 * @param sportKey The sport key
 * @param daysFrom Number of days in the past to include (1-3)
 * @returns Promise<GameWithScores[]>
 */
export const fetchScores = async (
  sportKey: string,
  daysFrom: number = 1
): Promise<GameWithScores[]> => {
  try {
    const url = `${BASE_URL}/sports/${sportKey}/scores/?apiKey=${API_KEY}&daysFrom=${daysFrom}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching scores: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching scores:", error);
    throw error;
  }
};

/**
 * Fetch upcoming events for a specific sport
 * @param sportKey The sport key
 * @returns Promise<Game[]>
 */
export const fetchEvents = async (sportKey: string): Promise<Game[]> => {
  try {
    const url = `${BASE_URL}/sports/${sportKey}/events?apiKey=${API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};