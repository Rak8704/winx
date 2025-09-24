"use client";
import React, { useRef } from "react";

// import aviator from "@/../public/games/aviator.png";
// import boxingKing from "@/../public/games/JL-boxing-king.png";
// import fortuneGems from "@/../public/games/JL-fortune-gems.png";
// import moneyComing from "@/../public/games/JL-money-coming.png";
// import crazyTime from "@/../public/games/crazy-time.png";
// import superAce from "@/../public/games/super-ace.png";

// import jl from "@/../public/games/JL.png";
// import spb from "@/../public/games/SPB.png";
// import evo from "@/../public/games/evo.png";
// import { GameCardWithProvider } from "./GameCards";
// const hotGamesData = [
//   {
//     gameName: "Aviator",
//     gameImage: aviator,
//     providerImage: spb,
//     redirect: "#",
//   },
//   {
//     gameName: "Boxing King",
//     gameImage: boxingKing,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Fortune Gems",
//     gameImage: fortuneGems,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Money Coming",
//     gameImage: moneyComing,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Crazy Time",
//     gameImage: crazyTime,
//     providerImage: evo,
//     redirect: "#",
//   },
//   {
//     gameName: "Super Ace",
//     gameImage: superAce,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Aviator",
//     gameImage: aviator,
//     providerImage: spb,
//     redirect: "#",
//   },
//   {
//     gameName: "Boxing King",
//     gameImage: boxingKing,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Fortune Gems",
//     gameImage: fortuneGems,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Money Coming",
//     gameImage: moneyComing,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Crazy Time",
//     gameImage: crazyTime,
//     providerImage: evo,
//     redirect: "#",
//   },
//   {
//     gameName: "Super Ace",
//     gameImage: superAce,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Aviator",
//     gameImage: aviator,
//     providerImage: spb,
//     redirect: "#",
//   },
//   {
//     gameName: "Boxing King",
//     gameImage: boxingKing,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Fortune Gems",
//     gameImage: fortuneGems,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Money Coming",
//     gameImage: moneyComing,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Crazy Time",
//     gameImage: crazyTime,
//     providerImage: evo,
//     redirect: "#",
//   },
//   {
//     gameName: "Super Ace",
//     gameImage: superAce,
//     providerImage: jl,
//     redirect: "#",
//   },
//   {
//     gameName: "Aviator",
//     gameImage: aviator,
//     providerImage: spb,
//     redirect: "#",
//   },
//   {
//     gameName: "Boxing King",
//     gameImage: boxingKing,
//     providerImage: jl,
//     redirect: "#",
//   },
// ];

import GameSelectionHeader from "./GameSelectionHeader";

const HotGames = () => {
  const gamesContainer = useRef<HTMLDivElement | null>(null);

  const handleRightButtonClick = () => {
    gamesContainer.current!.scrollLeft += -130;
  };
  const handleLeftButtonClick = () => {
    gamesContainer.current!.scrollLeft += 130;
  };
  return (
    <div
      className="my-4"
      style={{
        width: "100%",
      }}
    >
      <GameSelectionHeader
        title="Hot Games"
        leftAction={handleLeftButtonClick}
        rightAction={handleRightButtonClick}
        seeMoreLink="#"
      />
      <div
        className="max-w-full w-full overflow-x-auto scrollbar-none scroll-smooth"
        ref={gamesContainer}
      >
        <div className="hot-games-list">
          {/* {hotGamesData.map((g, i) => (
            <GameCardWithProvider
              gameImage={g.gameImage}
              gameName={g.gameName}
              providerImage={g.providerImage}
              redirect={g.redirect}
              key={i}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default HotGames;
