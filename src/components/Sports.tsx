/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef } from "react";

import sports_1 from "@/../public/sports/sports-1.png";
import sports_2 from "@/../public/sports/sports-2.png";
import sports_3 from "@/../public/sports/sports-3.png";
import sports_4 from "@/../public/sports/sports-4.png";

export const sportsData = [
  {
    image: sports_1,
    redirect: "/sports",
  },
  {
    image: sports_2,
    redirect: "/sports",
  },
  {
    image: sports_3,
    redirect: "/sports",
  },
  {
    image: sports_4,
    redirect: "/sports",
  },
];

import GameSelectionHeader from "./GameSelectionHeader";
import Link from "next/link";
import Image from "next/image";

const Sports = () => {
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
        title="Sports Games"
        leftAction={handleLeftButtonClick}
        rightAction={handleRightButtonClick}
        seeMoreLink="/live-sports"
      />
      <div
        className="max-w-full w-full overflow-x-auto scrollbar-none scroll-smooth"
        ref={gamesContainer}
      >
        <div className="hot-games-list">
          {sportsData.map((s, i) => (
            <SportsCard key={i} image={s.image} redirect={s.redirect} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sports;

export const SportsCard = ({
  image,
  redirect,
}: {
  image: any;
  redirect: string;
}) => {
  return (
    <Link href={redirect}>
      <Image src={image} alt="sports" />
    </Link>
  );
};
