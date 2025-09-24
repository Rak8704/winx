/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { GameXAGamesResponse } from "@/lib/api/gamexaApi";
import { useFetchGamesListMutation } from "@/lib/features/gamesApiSlice";
import { useGames } from "@/lib/store.zustond";
import { useEffect, useState } from "react";
import { fetchAllGames as fetchAllGames, convertGameXAToAppFormat } from "@/lib/api/gamexaApi";
import { GamesList, NetEnt } from "@/types/game";
import { AppGameFormat } from "@/lib/api/gamexaApi";

const GamesLoader = () => {
  const [fetchGamesList, { data: data, isLoading, error: apiError }] = useFetchGamesListMutation();
  const [gamexaGames, setGamexaGames] = useState<GameXAGamesResponse | null>(null);
  const [gamexaLoading, setGamexaLoading] = useState(true);
  const [gamexaError, setGamexaError] = useState<Error | null>(null);

  const { setLoading, setGames } = useGames((state) => state);

  // Fetch games from original API
  useEffect(() => {
    fetchGamesList({ game_type: "all" });
  }, [fetchGamesList]);

  // Fetch games from GameXA API
  useEffect(() => {
    const getGamexaGames = async () => {
      try {
        console.log("Fetching GameXA games...");
        const gamesData = await fetchAllGames();
        console.log(`GameXA games fetched successfully: ${gamesData.games?.length || 0} games`);
        setGamexaGames(gamesData);
        setGamexaError(null);
      } catch (error) {
        console.error("Error fetching GameXA games:", error);
        setGamexaError(error as Error);
      } finally {
        setGamexaLoading(false);
      }
    };

    getGamexaGames();
  }, []);

  // Combine games from both APIs or use just GameXA games if original API fails
  useEffect(() => {
    // If GameXA games are loaded
    if (gamexaGames && !gamexaLoading && !gamexaError) {
      try {
        // Convert GameXA games to app format
        const formattedGamexaGames = convertGameXAToAppFormat(gamexaGames);
        console.log(`Converted ${formattedGamexaGames.length} GameXA games to app format`);
        
        // Create provider categories from GameXA games
        const providerGames: Record<string, AppGameFormat[]> = {};
        
        formattedGamexaGames.forEach(game => {
          const provider = game.title;
          if (!providerGames[provider]) {
            providerGames[provider] = [];
          }
          providerGames[provider].push(game);
        });
        
        // Also group by categories for easier filtering
        const categoryGames: Record<string, AppGameFormat[]> = {};
        
        formattedGamexaGames.forEach(game => {
          const category = game.categories;
          if (!categoryGames[category]) {
            categoryGames[category] = [];
          }
          categoryGames[category].push(game);
        });
        
        // Combine provider and category groups
        const combinedProviderAndCategoryGames = {
          ...providerGames,
          ...categoryGames
        };
        
        // Log category counts for debugging
        Object.keys(combinedProviderAndCategoryGames).forEach(category => {
          console.log(`Category/Provider ${category}: ${combinedProviderAndCategoryGames[category].length} games`);
        });
        
        // Log all categories for debugging
        console.log("All categories/providers:", Object.keys(combinedProviderAndCategoryGames));
        
        // If original API data is available, combine them
        if (data && !isLoading) {
          const combinedGames: GamesList = {
            ...data.gamesList,
            ...combinedProviderAndCategoryGames
          } as GamesList;
          
          // Ensure fishing and video_poker categories are included
          if (combinedProviderAndCategoryGames.fishing && !combinedGames.fishing) {
            combinedGames.fishing = combinedProviderAndCategoryGames.fishing as unknown as NetEnt[];
          }
          
          if (combinedProviderAndCategoryGames.video_poker && !combinedGames.video_poker) {
            combinedGames.video_poker = combinedProviderAndCategoryGames.video_poker as unknown as NetEnt[];
          }
          
          console.log("Setting combined games:", Object.keys(combinedGames).length, "providers/categories");
          setLoading(false);
          setGames(combinedGames);
        }
        // If original API failed but we have GameXA games, use only GameXA games
        else if (apiError || (!data && !isLoading)) {
          console.log("Original API failed, using only GameXA games:", Object.keys(combinedProviderAndCategoryGames).length, "providers/categories");
          setLoading(false);
          setGames(combinedProviderAndCategoryGames as unknown as GamesList);
        }
      } catch (error) {
        console.error("Error processing GameXA games:", error);
      }
    }
    // If original API data is available but no GameXA games
    else if (data && !isLoading) {
      console.log("Setting only original API games");
      setLoading(false);
      setGames(data.gamesList);
    }
    // If both APIs failed
    else if ((apiError || (!data && !isLoading)) && (gamexaError || (!gamexaGames && !gamexaLoading))) {
      console.log("Both APIs failed, setting empty games list");
      console.error("Original API error:", apiError);
      console.error("GameXA API error:", gamexaError);
      setLoading(false);
      setGames({} as GamesList);
    }
  }, [data, isLoading, apiError, gamexaGames, gamexaLoading, gamexaError]);

  return null;
};

export default GamesLoader;
