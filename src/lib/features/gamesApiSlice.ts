// src/features/api/gamesApiSlice.ts

import { GameContent, GamesList } from "@/types/game";
import { apiSlice } from "./apiSlice";

const gamesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CHANGED: from query to mutation & added parameter
    fetchGamesList: builder.mutation<
      { success: boolean; gamesList: GamesList },
      { game_type: string; search?: string }
    >({
      query: ({ game_type, search }) => ({
        url: "api/games/list",
        method: "POST",
        body: { game_type, search },
      }),
    }),

    openGame: builder.mutation<any, { gameId: string; playerId?: string }>({
      query: (body) => ({
        url: `api/open-game`,
        method: "POST",
        body: body,
      }),
    }),

    // New endpoint for fetching games by provider from GameXA
    fetchGamesByProvider: builder.mutation<
      { success: boolean; games: any[] },
      { providerCode: string; page?: number; limit?: number }
    >({
      query: ({ providerCode, page = 1, limit = 200 }) => ({
        url: `api/gamexa/games/providers/${providerCode}`,
        method: "GET",
        params: { page, limit },
      }),
    }),
  }),
});

export const { useFetchGamesListMutation, useOpenGameMutation, useFetchGamesByProviderMutation } = gamesApiSlice;
