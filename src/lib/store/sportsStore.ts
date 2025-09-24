import { create } from "zustand";
import { Game, GameWithScores, Sport } from "@/types/sports";
import { fetchEvents, fetchOdds, fetchScores, fetchSports, fetchBetfairExchangeOdds } from "../api/sportsApi";

interface SportsState {
  sports: Sport[];
  selectedSport: Sport | null;
  games: Game[];
  betfairGames: Game[];
  gamesWithScores: GameWithScores[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchAllSports: () => Promise<void>;
  setSelectedSport: (sportKey: string) => void;
  fetchGamesForSport: (sportKey: string) => Promise<void>;
  fetchBetfairGamesForSport: (sportKey: string) => Promise<void>;
  fetchScoresForSport: (sportKey: string, daysFrom?: number) => Promise<void>;
  
  // Selectors
  getSportByKey: (sportKey: string) => Sport | undefined;
  getUpcomingGames: (limit?: number) => Game[];
  getLiveGames: () => GameWithScores[];
  getCompletedGames: () => GameWithScores[];
  getBetfairGames: (limit?: number) => Game[];
}

export const useSportsStore = create<SportsState>((set, get) => ({
  sports: [],
  selectedSport: null,
  games: [],
  betfairGames: [],
  gamesWithScores: [],
  isLoading: false,
  error: null,
  
  // Actions
  fetchAllSports: async () => {
    set({ isLoading: true, error: null });
    try {
      const sports = await fetchSports();
      set({ sports, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch sports", 
        isLoading: false 
      });
    }
  },
  
  setSelectedSport: (sportKey: string) => {
    const sport = get().sports.find(s => s.key === sportKey);
    set({ selectedSport: sport || null });
  },
  
  fetchGamesForSport: async (sportKey: string) => {
    set({ isLoading: true, error: null });
    try {
      const games = await fetchOdds(sportKey);
      set({ games, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch games", 
        isLoading: false 
      });
    }
  },
  
  fetchBetfairGamesForSport: async (sportKey: string) => {
    set({ isLoading: true, error: null });
    try {
      const betfairGames = await fetchBetfairExchangeOdds(sportKey);
      set({ betfairGames, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch Betfair Exchange games", 
        isLoading: false 
      });
    }
  },
  
  fetchScoresForSport: async (sportKey: string, daysFrom = 1) => {
    set({ isLoading: true, error: null });
    try {
      const gamesWithScores = await fetchScores(sportKey, daysFrom);
      set({ gamesWithScores, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch scores", 
        isLoading: false 
      });
    }
  },
  
  // Selectors
  getSportByKey: (sportKey: string) => {
    return get().sports.find(sport => sport.key === sportKey);
  },
  
  getUpcomingGames: (limit?: number) => {
    const now = new Date().toISOString();
    const upcomingGames = get().games.filter(game => game.commence_time > now);
    
    if (limit && limit > 0) {
      return upcomingGames.slice(0, limit);
    }
    
    return upcomingGames;
  },
  
  getBetfairGames: (limit?: number) => {
    const now = new Date().toISOString();
    const betfairGames = get().betfairGames.filter(game => game.commence_time > now);
    
    if (limit && limit > 0) {
      return betfairGames.slice(0, limit);
    }
    
    return betfairGames;
  },
  
  getLiveGames: () => {
    const now = new Date().toISOString();
    return get().gamesWithScores.filter(game => 
      !game.completed && game.commence_time <= now
    );
  },
  
  getCompletedGames: () => {
    return get().gamesWithScores.filter(game => game.completed);
  }
}));