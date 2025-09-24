import { NextRequest, NextResponse } from "next/server";
import { fetchAllGames, convertGameXAToAppFormat } from "@/lib/api/gamexaApi";

export async function POST(request: NextRequest) {
  try {
    // Remove authentication requirement for games list - games should be publicly accessible
    const body = await request.json();
    const { game_type, search } = body;

    // Define mock games list for fallback
    const mockGamesList = {
      slots: [
        {
          id: "slot1",
          name: "Fortune Gems",
          img: "/games/JL-fortune-gems.png",
          device: "mobile,desktop",
          title: "JL",
          categories: "slots",
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1"
        },
        {
          id: "slot2",
          name: "Money Coming",
          img: "/games/JL-money-coming.png",
          device: "mobile,desktop",
          title: "JL",
          categories: "slots",
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1"
        }
      ],
      live_dealers: [
        {
          id: "live1",
          name: "Crazy Time",
          img: "/games/crazy-time.png",
          device: "mobile,desktop",
          title: "EVO",
          categories: "live_dealers",
          bm: "0",
          demo: "0",
          rewriterule: "0",
          exitButton: "1"
        }
      ],
      sport: [
        {
          id: "sport1",
          name: "Boxing King",
          img: "/games/JL-boxing-king.png",
          device: "mobile,desktop",
          title: "JL",
          categories: "sport",
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1"
        }
      ],
      fishing: [
        {
          id: "fish1",
          name: "Fish Hunter",
          img: "/games/fish-hunter.png",
          device: "mobile,desktop",
          title: "JL",
          categories: "fishing",
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1"
        },
        {
          id: "fish2",
          name: "Deep Sea Treasure",
          img: "/games/deep-sea-treasure.png",
          device: "mobile,desktop",
          title: "PG",
          categories: "fishing",
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1"
        }
      ],
      video_poker: [
        {
          id: "poker1",
          name: "Jacks or Better",
          img: "/games/super-ace.png",
          device: "mobile,desktop",
          title: "NetEnt",
          categories: "video_poker",
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1"
        },
        {
          id: "poker2",
          name: "Deuces Wild",
          img: "/games/super-ace.png",
          device: "mobile,desktop",
          title: "Microgaming",
          categories: "video_poker",
          bm: "0",
          demo: "1",
          rewriterule: "0",
          exitButton: "1"
        }
      ]
    };

    try {
      // Fetch games from GameXA API
      console.log("Fetching games from GameXA API...");
      const gamexaGames = await fetchAllGames({ search: search || undefined });
      console.log("Raw GameXA response:", gamexaGames);
      
      if (gamexaGames && gamexaGames.games && gamexaGames.games.length > 0) {
        // Log game types for debugging
        const gameTypes = [...new Set(gamexaGames.games.map(game => game.game_type))];
        console.log("Available game types from GameXA API:", gameTypes);
        
        // Convert GameXA games to app format
        const formattedGames = convertGameXAToAppFormat(gamexaGames);
        console.log(`Converted ${formattedGames.length} GameXA games to app format`);
        
        // Group games by provider (title field contains provider code)
        const gamesByProvider: Record<string, unknown[]> = {};
        
        formattedGames.forEach(game => {
          const provider = game.title;
          if (!gamesByProvider[provider]) {
            gamesByProvider[provider] = [];
          }
          gamesByProvider[provider].push(game);
        });
        
        // Also group by categories for easier filtering
        const gamesByCategory: Record<string, unknown[]> = {};
        
        formattedGames.forEach(game => {
          const category = game.categories;
          if (!gamesByCategory[category]) {
            gamesByCategory[category] = [];
          }
          gamesByCategory[category].push(game);
        });
        
        // Log categories for debugging
        console.log("Categories created from games:", Object.keys(gamesByCategory));
        
        // Combine both groupings
        const gamesList = {
          ...gamesByProvider,
          ...gamesByCategory
        };
        
        console.log(`Organized games into ${Object.keys(gamesList).length} categories/providers`);
        console.log("Available categories/providers:", Object.keys(gamesList));
        
        // Return games based on game_type or all games if "all"
        let filteredGamesList;
        if (game_type === "all") {
          filteredGamesList = gamesList;
        } else if (gamesList[game_type]) {
          console.log(`Found ${gamesList[game_type].length} games for category ${game_type}`);
          filteredGamesList = { [game_type]: gamesList[game_type] };
        } else if (game_type === "fishing" && (!gamesList.fishing || gamesList.fishing.length === 0)) {
          // Special case for fishing games - use mock data if no fishing games from API
          console.log("No fishing games from API, using mock fishing games");
          filteredGamesList = { fishing: mockGamesList.fishing };
        } else {
          console.log(`No games found for category ${game_type}`);
          filteredGamesList = {};
        }

        return NextResponse.json({
          success: true,
          gamesList: filteredGamesList
        });
      } else {
        console.log("No games received from GameXA API, falling back to mock data");
        throw new Error("No games received from GameXA API");
      }
    } catch (gamexaError) {
      console.log("GameXA API failed, falling back to mock data:", gamexaError);
      
      // Fallback to mock games if GameXA API fails

      // Filter games by search term if provided
      let filteredMockGamesList: typeof mockGamesList = mockGamesList;
      if (search) {
        const searchLower = search.toLowerCase();
        filteredMockGamesList = {
          slots: [],
          live_dealers: [],
          sport: [],
          fishing: [],
          video_poker: []
        };
        
        Object.keys(mockGamesList).forEach(category => {
          const games = mockGamesList[category as keyof typeof mockGamesList];
          const filteredGames = games.filter(game =>
            game.name.toLowerCase().includes(searchLower)
          );
          
          if (filteredGames.length > 0) {
            filteredMockGamesList[category as keyof typeof filteredMockGamesList] = filteredGames;
          }
        });
      }

      // Return games based on game_type or all games if "all"
      let gamesList;
      if (game_type === "all") {
        gamesList = filteredMockGamesList;
      } else if (filteredMockGamesList[game_type as keyof typeof filteredMockGamesList]) {
        gamesList = { [game_type]: filteredMockGamesList[game_type as keyof typeof filteredMockGamesList] };
      } else {
        gamesList = {};
      }

      console.log("Using mock data for games list");
      return NextResponse.json({
        success: true,
        gamesList
      });
    }
  } catch (error) {
    console.error("Error fetching games list:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch games list",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
