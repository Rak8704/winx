"use client";
import AppHeader from "@/components/AppHeader";
import React, { useState } from "react";

import { GameCardWithProvider } from "@/components/GameCards";
import { useGames } from "@/lib/store.zustond";
import { Categories } from "@/types/game";
import PrimaryInput from "@/components/form/input";
import GameLoader from "@/components/loader/GameLoader";
import SideNavLayout from "@/components/SideNavLayout";

const Poker = () => {
  const [search, setSearch] = useState("");
  const { getGames } = useGames((state) => state);
  const gamesList = getGames(Categories.VideoPoker, search, 200);
  
  return (
    <SideNavLayout>
      <div>
        <AppHeader title="Poker" />
        <main className="py-5 px-2 bg-[#003e3e] min-h-screen">
          <div className="flex items-center">
            <PrimaryInput
              value={search}
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Poker Games"
              className="mb-2"
            />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {gamesList &&
              gamesList.map((game, i) => (
                <GameCardWithProvider game={game} key={i} />
              ))}

            <GameLoader length={20} loading={!gamesList} />
          </div>
          {gamesList && gamesList.length == 0 && (
            <span className="block text-center text-lg font-semibold text-[#23FFC8]">
              Not Found
            </span>
          )}
        </main>
      </div>
    </SideNavLayout>
  );
};

export default Poker;
