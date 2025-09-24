"use client";
import AppHeader from "@/components/AppHeader";
import React from "react";
const storage = LocalArrayStorage<string>();
import { GameCardWithProvider } from "@/components/GameCards";
import { useGames } from "@/lib/store.zustond";
import GameLoader from "@/components/loader/GameLoader";
import SideNavLayout from "@/components/SideNavLayout";
import { LocalArrayStorage } from "@/lib/favorites";

const Roulette = () => {
  const { getFavoriesGames } = useGames((state) => state);
  const gamesId = storage.getAll("favorites-games");
  const gamesList = getFavoriesGames(gamesId);
  return (
    <SideNavLayout>
      <div>
        <AppHeader title="Roulette" />
        <main className="py-5 px-2 bg-[#003e3e] min-h-screen">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
            {gamesList &&
              gamesList.map((game, i) => (
                <GameCardWithProvider game={game} key={i} />
              ))}

            <GameLoader lenght={20} loading={!!!gamesList} />
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

export default Roulette;
