"use client";
import React, { useRef } from "react";

import { GameCardWithProvider } from "./GameCards";

import GameSelectionHeader from "./GameSelectionHeader";
import { useGames } from "@/lib/store.zustond";
import { Categories } from "@/types/game";
import GameLoader from "./loader/GameLoader";

const SlotGames = () => {
  const gamesContainer = useRef<HTMLDivElement | null>(null);

  const handleRightButtonClick = () => {
    gamesContainer.current!.scrollLeft += -130;
  };
  const handleLeftButtonClick = () => {
    gamesContainer.current!.scrollLeft += 130;
  };

  const { getGames } = useGames((state) => state);
  const gamesList = getGames(Categories.Slots, undefined, 20);
  return (
    <div
      className="my-4"
      style={{
        width: "100%",
      }}
    >
      <GameSelectionHeader
        title="Slot Games"
        leftAction={handleLeftButtonClick}
        rightAction={handleRightButtonClick}
        seeMoreLink="/slots"
      />
      <div
        className="max-w-full w-full overflow-x-auto scrollbar-none scroll-smooth"
        ref={gamesContainer}
      >
        <div className="hot-games-list">
          {gamesList &&
            gamesList.map((game, i) => (
              <GameCardWithProvider key={i} game={game} />
            ))}

          <GameLoader length={20} loading={!!!gamesList} />
        </div>
      </div>
    </div>
  );
};

export default SlotGames;
