// "use client";
// import AppHeader from "@/components/AppHeader";
// import React, { useEffect, useRef, useState } from "react";

// import { GameCardWithProvider } from "@/components/GameCards";
// import { useGames } from "@/lib/store.zustond";
// import { Categories, Title } from "@/types/game";
// import PrimaryInput from "@/components/form/input";
// import GameLoader from "@/components/loader/GameLoader";

// import "swiper/css";
// import "swiper/css/navigation";
// import FilterProivder from "./filter-proivder";
// import Link from "next/link";
// import { MdFavorite } from "react-icons/md";
// import { ClipLoader } from "react-spinners";
// import SideNavLayout from "@/components/SideNavLayout";

// const SlotPage = () => {
//   const loaderRef = useRef<HTMLDivElement | null>(null);

//   const [search, setSearch] = useState<string>();
//   const [provider, setProvider] = useState<Title>();
//   const [limit, setLimit] = useState(30);

//   const { getGames } = useGames((state) => state);
//   const gamesList = getGames(Categories.Slots, search, limit, provider);

//   const hasIntersectedOnce = useRef(false);
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const entry = entries[0];

//         if (entry.isIntersecting && !hasIntersectedOnce.current) {
//           console.log("Loader is on screen, fetch data now!");
//           setLimit((limit) => limit + 9);
//           hasIntersectedOnce.current = true;
//         }

//         // Reset the flag when the loader goes out of view
//         if (!entry.isIntersecting) {
//           hasIntersectedOnce.current = false;
//         }
//       },
//       {
//         root: null,
//         rootMargin: "0px",
//         threshold: 0.1,
//       }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) {
//         observer.unobserve(loaderRef.current);
//       }
//     };
//   }, []);
//   return (
//     <SideNavLayout>
//       <div>
//         <AppHeader title="Slots" />
//         <main className="py-5 px-2 bg-[#003e3e]">
//           <FilterProivder onSelect={(provider) => setProvider(provider)} />
//           <div className="flex items-center gap-2">
//             <PrimaryInput
//               placeholder="Search Games"
//               className="mb-2"
//               onChange={(e) => setSearch(e.target.value)}
//               value={search}
//             />
//             <Link
//               href="/favorits"
//               title="favorits"
//               className="bg-wwwwwwck-44-4comdaintree -mt-2 rounded-[10.4px] overflow-hidden border border-solid border-[#006165] shadow-[0px_2.08px_0px_#002631] p-3"
//             >
//               <MdFavorite className="w-5 h-5 text-[#23ffc8]" />
//             </Link>
//           </div>
//           <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-2">
//             {gamesList &&
//               gamesList.map((game, i) => (
//                 <GameCardWithProvider game={game} key={i} />
//               ))}

//             <GameLoader lenght={15} loading={!!!gamesList} />
//           </div>

//           <div
//             ref={loaderRef}
//             className="my-5 flex items-center justify-center"
//           >
//             {gamesList && gamesList.length > 29 && (
//               <ClipLoader color="#FFB800" size={25} />
//             )}
//           </div>
//         </main>
//       </div>
//     </SideNavLayout>
//   );
// };

// export default SlotPage;

"use client";
import AppHeader from "@/components/AppHeader";
import React, { useEffect, useRef, useState } from "react";

import { GameCardWithProvider } from "@/components/GameCards";
import { useGames } from "@/lib/store.zustond";
import { Categories, Title } from "@/types/game";
import PrimaryInput from "@/components/form/input";
import GameLoader from "@/components/loader/GameLoader";

import "swiper/css";
import "swiper/css/navigation";
import FilterProivder from "./filter-proivder";
import Link from "next/link";
import { MdFavorite } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import SideNavLayout from "@/components/SideNavLayout";
import { useFetchGamesByProviderMutation } from "@/lib/features/gamesApiSlice";

const SlotPage = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState<string>();
  const [provider, setProvider] = useState<Title>();
  const [limit, setLimit] = useState(30);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const { getGames, setProviderGames, setProviderLoading } = useGames((state) => state);
  const [fetchGamesByProvider] = useFetchGamesByProviderMutation();
  
  const gamesList = getGames(Categories.Slots, search, limit, provider);

  const hasIntersectedOnce = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !hasIntersectedOnce.current) {
          console.log("Loader is on screen, fetch data now!");
          setLimit((limit) => limit + 9);
          hasIntersectedOnce.current = true;
        }

        // Reset the flag when the loader goes out of view
        if (!entry.isIntersecting) {
          hasIntersectedOnce.current = false;
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  const handleProviderChange = async (provider: Title | "all") => {
    setIsFilterLoading(true);
    setProvider(provider as Title);
    
    // If "all" is selected, we don't need to fetch provider-specific games
    if (provider === "all") {
      setIsFilterLoading(false);
      return;
    }
  
   const providerCodeMap: Record<Title, string> = {
  [Title.Evolution]: "evolution",
  [Title.FastGames]: "fastgames",
  [Title.Jili]: "jili_gaming",
  [Title.Microgaming]: "microgaming_slot",
  [Title.NetEnt]: "netent",
  [Title.Pgsoft]: "pgsoft_slot",
  [Title.Playngo]: "playngo",
  [Title.RedTiger]: "red_tiger",
  [Title.SportBetting]: "sport_betting",
  [Title.Ainsworth]: "ainsworth",
  [Title.Amatic]: "amatic",
  [Title.AmigoGaming]: "amigo_gaming",
  [Title.Apex]: "apex",
  [Title.Apollo]: "apollo",
  [Title.Aristocrat]: "aristocrat",
  [Title.Bingo]: "bingo",
  [Title.Booming]: "booming",
  [Title.Egaming]: "egaming",
  [Title.Egt]: "egt",
  [Title.Firekirin]: "firekirin",
  [Title.Fish]: "fish",
  [Title.Goldenrace]: "goldenrace",
  [Title.Habanero]: "habanero_slot",
  [Title.Igrosoft]: "igrosoft",
  [Title.Igt]: "igt",
  [Title.Kajot]: "kajot",
  [Title.Keno]: "keno",
  [Title.Mancala]: "mancala",
  [Title.Merkur]: "merkur",
  [Title.Novomatic]: "novomatic",
  [Title.Pragmatic]: "pragmatiplay_slot",
  [Title.Quickspin]: "quickspin",
  [Title.Roulette]: "roulette",
  [Title.Rubyplay]: "rubyplay",
  [Title.ScientificGames]: "scientific_games",
  [Title.TableGames]: "table_games",
  [Title.Vegas]: "vegas",
  [Title.Wazdan]: "wazdan",
  [Title.Zitro]: "zitro",
  [Title.CQ9]: "cq9_slot",
  [Title.SexyGaming]: "sexygaming",
  [Title.PlayTech]: "playtech_slot",
  [Title.EpicWin]: "epicwin",
  [Title.Rich88]: "rich88",
  [Title.RelaxGaming]: "relax_gaming",
  [Title.Yggdrasil]: "ygr",
  [Title.TurboGames]: "turbogames",
  [Title.SkyWind]: "skywind",
  [Title.Hacksaw]: "hacksaw",
  [Title.TadaGaming]: "tada_gaming",
  [Title.BGaming]: "bgaming",
  [Title.KM]: "km",
  [Title.Ezugi]: "ezugi",
  [Title.SmartSoft]: "smartsoft",
  [Title.BTgaming]: "btgaming",
  [Title._2J]: "2j",
  [Title._5G]: "5g",
  [Title.PGSGaming]: "pgsgaming",
  [Title.GameArt]: "game_art",
  [Title.OneGaming]: "onegaming",
  [Title.InOut]: "inout",
  [Title.AG]: "ag",
  [Title.EazyGaming]: "eazy_gaming",
  [Title.KoolBet]: "koolbet",
  [Title.FaChai]: "fachai",
  [Title.NoLimitCity]: "nolimitcity",
  [Title.BigTimeGaming]: "big_time_gaming",
  [Title.AStar]: "astar",
  [Title.Mini]: "mini",
  [Title.Galaxsys]: "galaxsys",
  [Title.Spribe]: "spribe",
  [Title.V8]: "v8",
  [Title.JDBGaming]: "jdb_gaming",
  [Title.T1]: "t1",
  [Title.YeeBet]: "yeebet",
  [Title.WonWon]: "wonwon",
  [Title.Pix]: "pix",
  [Title.BFlottoBiit]: "bflottobiit",
  [Title.BTI]: "bti",
  [Title.DPESportsGaming]: "dpesportsgaming",
  [Title.DPSportsGaming]: "dpsportsgaming",
  [Title.DreamGaming]: "dreamgaming",
  [Title.LuckySportGaming]: "luckysportgaming",
  [Title.OnGaming]: "ongaming",
  [Title.Ideal]: "ideal",
};

 
    
    // Get the GameXA provider code
    const gameXAProviderCode = providerCodeMap[provider];
    
    // Fetch games by provider from GameXA API
    try {
      setProviderLoading(true);
      const response = await fetchGamesByProvider({
        providerCode: gameXAProviderCode,
        limit: 100
      }).unwrap();
      
      if (response.success) {
        // Convert GameXA games to NetEnt format
        const convertedGames = response.games.map((game: any) => ({
          id: game.game_uid,
          name: game.game_name,
          img: game.image_url,
          device: "mobile,desktop",
          title: provider, // Use the frontend provider code
          categories: game.game_type === "slot" ? Categories.Slots : game.game_type,
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1",
        }));
        
        // Store provider-specific games in the store
        setProviderGames(provider, convertedGames);
      }
    } catch (error) {
      console.error("Error fetching games by provider:", error);
    } finally {
      setProviderLoading(false);
      setIsFilterLoading(false);
    }
  };

  return (
    <SideNavLayout>
      <div>
        <AppHeader title="Slots" />
        <main className="py-5 px-2 bg-[#003e3e]">
          <FilterProivder onSelect={handleProviderChange} />
          <div className="flex items-center gap-2">
            <PrimaryInput
              placeholder="Search Games"
              className="mb-2"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Link
              href="/favorites"
              title="favorites"
              className="bg-wwwwwwck-44-4comdaintree -mt-2 rounded-[10.4px] overflow-hidden border border-solid border-[#006165] shadow-[0px_2.08px_0px_#002631] p-3"
            >
              <MdFavorite className="w-5 h-5 text-[#23ffc8]" />
            </Link>
          </div>

          {isFilterLoading ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-2">
              <GameLoader length={15} loading={true} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 lg:gap-4 mt-2">
                {gamesList &&
                  gamesList.map((game, i) => (
                    <GameCardWithProvider game={game} key={i} />
                  ))}

                {!gamesList && <GameLoader length={15} loading={true} />}
              </div>

              <div
                ref={loaderRef}
                className="my-5 flex items-center justify-center"
              >
                {gamesList && gamesList.length > 29 && (
                  <ClipLoader color="#FFB800" size={25} />
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </SideNavLayout>
  );
};

export default SlotPage;
