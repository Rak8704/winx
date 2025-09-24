"use client";
import React, { useRef } from "react";

import { GameCardWithProvider } from "./GameCards";

import GameSelectionHeader from "./GameSelectionHeader";
import { useGames } from "@/lib/store.zustond";
import { Categories } from "@/types/game";
import GameLoader from "./loader/GameLoader";

const LiveCasino = () => {
  const { getGames } = useGames((state) => state);

  const gamesContainer = useRef<HTMLDivElement | null>(null);

  const handleRightButtonClick = () => {
    gamesContainer.current!.scrollLeft += -130;
  };
  const handleLeftButtonClick = () => {
    gamesContainer.current!.scrollLeft += 130;
  };

  const gamesList = getGames(Categories.LiveDealers, undefined, 20, undefined);
  return (
    <div
      className="my-4"
      style={{
        width: "100%",
      }}
    >
      <GameSelectionHeader
        title="Live Casino"
        leftAction={handleLeftButtonClick}
        rightAction={handleRightButtonClick}
        seeMoreLink="/live-casino"
      />
      <div
        className="max-w-full w-full overflow-x-auto scrollbar-none scroll-smooth"
        ref={gamesContainer}
      >
        <div className="hot-games-list">
          {gamesList &&
            gamesList.map((game, i) => (
              <GameCardWithProvider game={game} key={i} />
            ))}

          <GameLoader lenght={20} loading={!!!gamesList} />
        </div>
      </div>
    </div>
  );
};

export default LiveCasino;
