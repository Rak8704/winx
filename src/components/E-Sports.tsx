"use client";
import React, { useRef } from "react";

import { GameCardWithProvider } from "./GameCards";

import GameSelectionHeader from "./GameSelectionHeader";
// import { useGames } from "@/lib/store.zustond";
import { Categories, Title } from "@/types/game";

export const sports = [
  {
    id: "8357",
    name: "CYBER BET MOBILE",
    img: "https://static.cdneu-stat.com/resources/sitepicstbs/imperium_bet/game_img_2/ibcb.jpg",
    device: "1",
    title: Title.SportBetting,
    categories: Categories.Sport,
    bm: "0",
    demo: "1",
    rewriterule: "0",
    exitButton: "1",
  },
  {
    id: "3002",
    name: "SPORT BET",
    img: "https://static.cdneu-stat.com/resources/sitepicstbs/imperium_bet/game_img_2/ib.jpg",
    device: "0",
    title: Title.SportBetting,
    categories: Categories.Sport,
    bm: "0",
    demo: "1",
    rewriterule: "0",
    exitButton: "1",
  },
  {
    id: "3001",
    name: "CYBER BET",
    img: "https://static.cdneu-stat.com/resources/sitepicstbs/imperium_bet/game_img_2/ibcb.jpg",
    device: "0",
    title: Title.SportBetting,
    categories: Categories.Sport,
    bm: "0",
    demo: "1",
    rewriterule: "0",
    exitButton: "1",
  },
  {
    id: "3000",
    name: "SPORT BET MOBILE",
    img: "https://static.cdneu-stat.com/resources/sitepicstbs/imperium_bet/game_img_2/ib.jpg",
    device: "1",
    title: Title.SportBetting,
    categories: Categories.Sport,
    bm: "0",
    demo: "1",
    rewriterule: "0",
    exitButton: "1",
  },
];

const ESports = () => {
  //   const { getGames } = useGames((state) => state);

  const gamesContainer = useRef<HTMLDivElement | null>(null);

  const handleRightButtonClick = () => {
    gamesContainer.current!.scrollLeft += -130;
  };
  const handleLeftButtonClick = () => {
    gamesContainer.current!.scrollLeft += 130;
  };

  //   const gamesList = getGames(Categories.Sport, undefined, 20);

  return (
    <div
      className="my-4"
      style={{
        width: "100%",
      }}
    >
      <GameSelectionHeader
        title="E-Sports"
        leftAction={handleLeftButtonClick}
        rightAction={handleRightButtonClick}
        seeMoreLink="#"
  />
      <div
        className="max-w-full w-full overflow-x-auto scrollbar-none scroll-smooth"
        ref={gamesContainer}
      >
        <div className="hot-games-list">
          {sports &&
            sports.map((game, i) => (
              <GameCardWithProvider game={game} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ESports;
