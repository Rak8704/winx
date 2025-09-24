"use client";

import { useState } from "react";
import { SportsList } from "./SportsList";
import { GamesList } from "./GamesList";
import { GameOddsDetail } from "./GameOddsDetail";
import { Game } from "@/types/sports";
import PrimaryInput from "@/components/form/input";

export const SportsContainer = () => {
  const [selectedSportKey, setSelectedSportKey] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectSport = (sportKey: string) => {
    setSelectedSportKey(sportKey);
    setSelectedGame(null);
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-100px)]">
      {/* Left sidebar - Sports list */}
      <div className="w-full md:w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-4">
          <h2 className="text-xl font-bold text-[#23FFC8] mb-4">Sports</h2>
          <PrimaryInput
            value={searchQuery}
            type="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Sports"
            className="mb-4"
          />
        </div>
        <SportsList 
          onSelectSport={handleSelectSport} 
          selectedSportKey={selectedSportKey || undefined} 
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-[#003e3e] overflow-y-auto">
        {selectedGame ? (
          <GameOddsDetail 
            game={selectedGame} 
            onBack={handleBackToGames} 
          />
        ) : (
          selectedSportKey ? (
            <GamesList 
              sportKey={selectedSportKey} 
              onSelectGame={handleSelectGame} 
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-[#23FFC8] mb-4">
                  Welcome to Sports Betting
                </h2>
                <p className="text-gray-300 mb-6">
                  Select a sport from the sidebar to view upcoming games and odds
                </p>
                <div className="flex justify-center">
                  <div className="bg-gray-800 p-4 rounded-lg max-w-md">
                    <h3 className="text-[#23FFC8] font-medium mb-2">Popular Sports</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["americanfootball_nfl", "basketball_nba", "soccer_epl", "baseball_mlb"].map((sportKey) => (
                        <button
                          key={sportKey}
                          onClick={() => handleSelectSport(sportKey)}
                          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
                        >
                          {sportKey.split('_').map(word => 
                            word.toUpperCase()
                          ).join(' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};