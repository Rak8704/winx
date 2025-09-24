"use client";

import { Game } from "@/types/sports";
import { useEffect } from "react";
import { useSportsStore } from "@/lib/store/sportsStore";
import { formatDistanceToNow, parseISO } from "date-fns";

interface GamesListProps {
  sportKey: string;
  onSelectGame?: (game: Game) => void;
}

export const GamesList = ({ sportKey, onSelectGame }: GamesListProps) => {
  const { 
    games, 
    fetchGamesForSport, 
    isLoading, 
    error,
    getSportByKey
  } = useSportsStore();

  const sport = getSportByKey(sportKey);

  useEffect(() => {
    if (sportKey) {
      fetchGamesForSport(sportKey);
    }
  }, [sportKey, fetchGamesForSport]);

  if (isLoading && games.length === 0) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error loading games: {error}</p>
        <button 
          onClick={() => fetchGamesForSport(sportKey)}
          className="mt-2 px-4 py-2 bg-[#23FFC8] text-black rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>No upcoming games found for {sport?.title || sportKey}</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-4">
      <h2 className="text-xl font-bold text-[#23FFC8]">
        {sport?.title || "Upcoming Games"}
      </h2>
      
      <div className="space-y-4">
        {games.map((game) => (
          <div 
            key={game.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => onSelectGame && onSelectGame(game)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                {formatDistanceToNow(parseISO(game.commence_time), { addSuffix: true })}
              </span>
              <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">
                {game.sport_title}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-white font-medium">{game.home_team}</div>
              <div className="text-gray-400">vs</div>
              <div className="text-white font-medium">{game.away_team}</div>
            </div>
            
            {game.bookmakers.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Odds (Moneyline)</div>
                <div className="flex justify-between">
                  {game.bookmakers[0].markets
                    .filter(market => market.key === 'h2h')
                    .map(market => market.outcomes)
                    .flat()
                    .map(outcome => (
                      <div key={outcome.name} className="flex flex-col items-center">
                        <span className="text-xs text-gray-400">{outcome.name}</span>
                        <span className={`text-sm font-medium ${
                          outcome.price > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {outcome.price > 0 ? `+${outcome.price}` : outcome.price}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};