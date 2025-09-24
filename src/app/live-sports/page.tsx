"use client";
import AppHeader from "@/components/AppHeader";
import React from "react";

// import { GameCardWithProvider } from "@/components/GameCards";
// import { useGames } from "@/lib/store.zustond";
// import { Categories } from "@/types/gamelist";
// import { sports } from "@/components/E-Sports";
import { SportsCard, sportsData } from "@/components/Sports";
import SideNavLayout from "@/components/SideNavLayout";

const ESportsPage = () => {
  //   const { getGames } = useGames((state) => state);
  //   const gamesList = getGames(Categories.Sport);
  return (
    <SideNavLayout>
      <div>
        <AppHeader title="Sports" />
        <main className="py-5 px-2 bg-[#003e3e] min-h-screen">
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-3 lg:gap-4 gap-2">
            {sportsData.map((s, i) => (
              <SportsCard key={i} image={s.image} redirect={s.redirect} />
            ))}
          </div>
        </main>
      </div>
    </SideNavLayout>
  );
};

export default ESportsPage;
