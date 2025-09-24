"use client";
import AppHeader from "@/components/AppHeader";
import React from "react";

import { GameCardWithProvider } from "@/components/GameCards";
// import { useGames } from "@/lib/store.zustond";
// import { Categories } from "@/types/gamelist";
import PrimaryInput from "@/components/form/input";
import { sports } from "@/components/E-Sports";

const ESportsPage = () => {
  //   const { getGames } = useGames((state) => state);
  //   const gamesList = getGames(Categories.Sport);
  return (
    <div>
      <AppHeader title="E-Sports" />
      <main className="py-5 px-2 bg-[#003e3e]">
        <div className="flex items-center">
          <PrimaryInput placeholder="Search Games" className="mb-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sports &&
            sports.map((game, i) => (
              <GameCardWithProvider game={game} key={i} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default ESportsPage;
