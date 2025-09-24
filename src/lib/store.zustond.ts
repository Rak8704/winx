/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtendedCard } from "@/types/api/card";
import { Categories, GamesList, NetEnt } from "@/types/game";
import { create } from "zustand";

interface WithdrawCardType {
  card: ExtendedCard | null;
  setCard: (card: ExtendedCard) => void;
}

export const useCard = create<WithdrawCardType>((set) => ({
  card: null,
  setCard: (card) => set((state) => ({ ...state, card })),
}));

interface GameType {
  games: GamesList | null;
  isLoading: boolean;
  error: string;
  providerGames: Record<string, NetEnt[]> | null;
  isProviderLoading: boolean;

  getGames: (
    category: string,
    name?: string,
    limit?: number,
    provider?: any
  ) => NetEnt[] | null;

  getCustomeCategoriesGames: (
    category: string,
    search?: string
  ) => NetEnt[] | null;

  getFavoriesGames: (gamesId: string[]) => NetEnt[] | null;

  setGames: (gamge: GamesList) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  setProviderGames: (provider: string, games: NetEnt[]) => void;
  setProviderLoading: (isLoading: boolean) => void;
}
export const useGames = create<GameType>((set, get) => ({
  games: null,
  isLoading: true,
  error: "",
  providerGames: null,
  isProviderLoading: false,

  getGames: (category, name, limit, provider) => {
    const state = get();
    const games = state.games!;
    
    // If provider games are available and a provider is selected, use them
    if (provider && provider !== "all" && state.providerGames && state.providerGames[provider]) {
      console.log(`Using provider-specific games for ${provider}`);
      let providerGames = state.providerGames[provider];
      
      // Apply search filter if provided
      if (name) {
        const searchLower = name.toLowerCase();
        providerGames = providerGames.filter((game) =>
          game.name.toLowerCase().includes(searchLower)
        );
        console.log(`Provider games filtered by search ${name}: ${providerGames.length}`);
      }
      
      // Apply limit if provided
      if (limit !== undefined && limit > 0) {
        return providerGames.slice(0, limit);
      }
      
      return providerGames;
    }
    
    if (!games) return null;
    const allGamesArrays = Object.values(games).flat();
    console.log(`Getting games for category: ${category}, search: ${name}, provider: ${provider}`);
    console.log(`Total games available: ${allGamesArrays.length}`);

    let flitedGames = allGamesArrays.filter((game) => {
      if (category === Categories.Slots) {
        return (
          game.categories === category ||
          game.categories == Categories.FastGames
        );
      } else {
        return game.categories === category;
      }
    });
    console.log(`Games filtered by category ${category}: ${flitedGames.length}`);

    if (provider && provider !== "all") {
      const providerFiltered = allGamesArrays!.filter((game) => game.title === provider);
      console.log(`Games filtered by provider ${provider}: ${providerFiltered.length}`);
      flitedGames = providerFiltered;
    }

    if (name) {
      const searchLower = name.toLowerCase();
      const searchFiltered = flitedGames.filter((game) =>
        game.name.toLowerCase().includes(searchLower)
      );
      console.log(`Games filtered by search ${name}: ${searchFiltered.length}`);
      flitedGames = searchFiltered;
    }

    if (limit !== undefined && limit > 0) {
      return flitedGames.slice(0, limit);
    }

    return flitedGames;
  },
  getCustomeCategoriesGames: (category, search) => {
    const games = get().games!;
    if (!games) return null;

    const allGamesArrays = Object.values(games).flat();
    let flitedGames: any;
    if (category == "hot") {
      const gamesId = [
        "8892",
        "8891",
        "8890",
        "15808",
        "15814",
        "15815",
        "15813",
        "15810",
        "15809",
        "15065",
        "15056",
        "15812",
        "7053",
        "10269",
        "9896",
      ];
      flitedGames = allGamesArrays.filter((game) => gamesId.includes(game.id));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      flitedGames = flitedGames.filter((game: any) =>
        game.name.toLowerCase().includes(searchLower)
      );
    }
    return flitedGames;
  },
  getFavoriesGames: (gamesId) => {
    const games = get().games!;
    if (!games) return null;
    const allGamesArrays = Object.values(games).flat();

    const flitedGames = allGamesArrays.filter((game) =>
      gamesId.includes(game.id)
    );

    return flitedGames;
  },
  setGames: (games) => set((state) => ({ ...state, games })),
  setLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
  setError: (error) => set((state) => ({ ...state, error })),
  setProviderGames: (provider, games) => set((state) => ({
    ...state,
    providerGames: {
      ...state.providerGames,
      [provider]: games
    }
  })),
  setProviderLoading: (isLoading) => set((state) => ({ ...state, isProviderLoading: isLoading })),
}));
