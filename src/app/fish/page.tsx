"use client";

import React, { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import { GameCardWithProvider } from "@/components/GameCards";
import { useGames } from "@/lib/store.zustond";
import { Categories, Title, NetEnt } from "@/types/game";
import PrimaryInput from "@/components/form/input";
import GameLoader from "@/components/loader/GameLoader";
import SideNavLayout from "@/components/SideNavLayout";

const FishPage = () => {
  const [search, setSearch] = useState("");
  const [gamesList, setGamesList] = useState<NetEnt[]>([]); // ✅ TypeScript safe
  const [loading, setLoading] = useState(true);

  const { getGames } = useGames((state) => state);

  // Async fetch + fallback
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);

      // Try to get fishing games first
      const fishingGames = await getGames("fishing", search, 200);
      console.log("Fishing games found:", fishingGames?.length || 0);
      
      if (fishingGames && fishingGames.length > 0) {
        setGamesList(fishingGames);
      } else {
        // Fallback to other categories
        const fallbackCategories = ["arcade", "fish_game"];
        let list: NetEnt[] = [];

        for (const category of fallbackCategories) {
          const result = await getGames(category, search, 200);
          console.log(`Fallback category ${category} games found:`, result?.length || 0);
          if (result && result.length > 0) {
            list = result;
            break;
          }
        }
        
        setGamesList(list);
      }

      setLoading(false);
    };

    fetchGames();
  }, [search, getGames]);

  return (
    <SideNavLayout>
      <div>
        <AppHeader title="Fish Games" />
        <main className="py-5 px-2 bg-[#003e3e] min-h-screen">
          {/* Search Input */}
          <div className="flex items-center mb-4">
            <PrimaryInput
              value={search}
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Fish Games"
              className="w-full"
            />
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {loading ? (
              <GameLoader length={20} loading={loading} />
            ) : gamesList.length > 0 ? (
              gamesList.map((game, i) => (
                <GameCardWithProvider game={game} key={i} />
              ))
            ) : null}
          </div>

          {/* No Result */}
          {!loading && gamesList.length === 0 && (
            <span className="block text-center text-lg font-semibold text-[#23FFC8] mt-5">
              Not Found
            </span>
          )}
        </main>
      </div>
    </SideNavLayout>
  );
};

export default FishPage;
