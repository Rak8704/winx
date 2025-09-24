"use client";
import AppHeader from "@/components/AppHeader";
import React, { useState, useEffect } from "react";

import { GameCardWithProvider } from "@/components/GameCards";
import { useGames } from "@/lib/store.zustond";
import { Categories } from "@/types/game";
import PrimaryInput from "@/components/form/input";
import GameLoader from "@/components/loader/GameLoader";
import SideNavLayout from "@/components/SideNavLayout";

const Games = () => {
  const [search, setSearch] = useState("");
  const { getGames, isLoading } = useGames((state) => state);
  const [gamesList, setGamesList] = useState<any[]>([]);
  
  useEffect(() => {
    // Try to get video poker games first
    let games = getGames(Categories.VideoPoker, search, 200);
    
    // If no video poker games found, try slots as fallback
    if (!games || games.length === 0) {
      games = getGames(Categories.Slots, search, 200);
    }
    
    setGamesList(games || []);
  }, [getGames, search]);

  return (
    <SideNavLayout>
      <div>
        <AppHeader title="Games" />
        <main className="py-5 px-2 bg-[#003e3e] min-h-screen">
          <div className="flex items-center">
            <PrimaryInput
              value={search}
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Games"
              className="mb-2"
            />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {gamesList &&
              gamesList.map((game,i) => (
                <GameCardWithProvider game={game} key={i} />
              ))}

            <GameLoader lenght={20} loading={isLoading || !gamesList} />
          </div>
          {gamesList && gamesList.length === 0 && (
            <span className="block text-center text-lg font-semibold text-[#23FFC8]">
              Not Found
            </span>
          )}
        </main>
      </div>
    </SideNavLayout>
  );
};

export default Games;
