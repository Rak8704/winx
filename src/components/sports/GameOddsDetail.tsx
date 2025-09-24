"use client";

import { Game, Market, Outcome } from "@/types/sports";
import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";
import { useSportsStore } from "@/lib/store/sportsStore";

interface GameOddsDetailProps {
  game: Game;
  onBack: () => void;
}

export const GameOddsDetail = ({ game, onBack }: GameOddsDetailProps) => {
  const [selectedBookmaker, setSelectedBookmaker] = useState(
    game.bookmakers.length > 0 ? game.bookmakers[0].key : ""
  );
  const [showBetfairOdds, setShowBetfairOdds] = useState(false);
  const { fetchBetfairGamesForSport, betfairGames } = useSportsStore();
  const [betfairGame, setBetfairGame] = useState<Game | null>(null);
  const [betfairLoading, setBetfairLoading] = useState(false);

  // Fetch Betfair Exchange odds when toggled
  useEffect(() => {
    if (showBetfairOdds && !betfairGame) {
      setBetfairLoading(true);
      fetchBetfairGamesForSport(game.sport_key)
        .then(() => {
          setBetfairLoading(false);
        })
        .catch(() => {
          setBetfairLoading(false);
        });
    }
  }, [showBetfairOdds, game.sport_key, fetchBetfairGamesForSport, betfairGame]);

  // Find the matching Betfair game when betfairGames changes
  useEffect(() => {
    if (betfairGames.length > 0) {
      const matchingGame = betfairGames.find(
        (bg) => 
          bg.home_team === game.home_team && 
          bg.away_team === game.away_team
      );
      setBetfairGame(matchingGame || null);
    }
  }, [betfairGames, game.home_team, game.away_team]);

  // Use either regular bookmaker or Betfair Exchange
  const bookmaker = showBetfairOdds 
    ? (betfairGame?.bookmakers.find(b => b.key === "betfair_ex_uk") || null)
    : game.bookmakers.find((b) => b.key === selectedBookmaker);
  
  const formatOdds = (price: number): string => {
    if (price > 0) {
      return `+${price}`;
    }
    return `${price}`;
  };

  const renderMarket = (market: Market) => {
    switch (market.key) {
      case "h2h":
        return renderMoneylineMarket(market);
      case "spreads":
        return renderSpreadsMarket(market);
      case "totals":
        return renderTotalsMarket(market);
      default:
        return renderGenericMarket(market);
    }
  };

  const renderMoneylineMarket = (market: Market) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h4 className="text-[#23FFC8] font-medium mb-3">Moneyline</h4>
      <div className="grid grid-cols-2 gap-4">
        {market.outcomes.map((outcome) => (
          <div key={outcome.name} className="bg-gray-700 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-white">{outcome.name}</span>
              <span className={`font-medium ${outcome.price > 0 ? "text-green-400" : "text-red-400"}`}>
                {formatOdds(outcome.price)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSpreadsMarket = (market: Market) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h4 className="text-[#23FFC8] font-medium mb-3">Point Spread</h4>
      <div className="grid grid-cols-2 gap-4">
        {market.outcomes.map((outcome) => (
          <div key={outcome.name} className="bg-gray-700 p-3 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white">{outcome.name}</span>
              <span className={`font-medium ${outcome.price > 0 ? "text-green-400" : "text-red-400"}`}>
                {formatOdds(outcome.price)}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Spread: {outcome.point && outcome.point > 0 ? `+${outcome.point}` : outcome.point}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTotalsMarket = (market: Market) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h4 className="text-[#23FFC8] font-medium mb-3">Totals (Over/Under)</h4>
      <div className="grid grid-cols-2 gap-4">
        {market.outcomes.map((outcome) => (
          <div key={outcome.name} className="bg-gray-700 p-3 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white">{outcome.name}</span>
              <span className={`font-medium ${outcome.price > 0 ? "text-green-400" : "text-red-400"}`}>
                {formatOdds(outcome.price)}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Line: {outcome.point}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGenericMarket = (market: Market) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h4 className="text-[#23FFC8] font-medium mb-3">{market.key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</h4>
      <div className="grid grid-cols-2 gap-4">
        {market.outcomes.map((outcome, index) => (
          <div key={`${outcome.name}-${index}`} className="bg-gray-700 p-3 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-white">{outcome.name}</span>
              <span className={`font-medium ${outcome.price > 0 ? "text-green-400" : "text-red-400"}`}>
                {formatOdds(outcome.price)}
              </span>
            </div>
            {outcome.point !== undefined && (
              <div className="text-sm text-gray-400">
                Line: {outcome.point}
              </div>
            )}
            {outcome.description && (
              <div className="text-sm text-gray-400">
                {outcome.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-[#23FFC8]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Games
      </button>

      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-400 mb-1">
          {format(parseISO(game.commence_time), "PPP 'at' p")}
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          {game.home_team} vs {game.away_team}
        </h2>
        <div className="text-sm text-[#23FFC8]">{game.sport_title}</div>
      </div>

      {/* Toggle between regular odds and Betfair Exchange */}
      <div className="mb-4 flex items-center">
        <button 
          onClick={() => setShowBetfairOdds(false)}
          className={`px-4 py-2 rounded-l-md ${!showBetfairOdds 
            ? 'bg-[#23FFC8] text-black font-medium' 
            : 'bg-gray-700 text-white'}`}
        >
          Regular Odds
        </button>
        <button 
          onClick={() => setShowBetfairOdds(true)}
          className={`px-4 py-2 rounded-r-md ${showBetfairOdds 
            ? 'bg-[#23FFC8] text-black font-medium' 
            : 'bg-gray-700 text-white'}`}
        >
          Betfair Exchange
        </button>
      </div>

      {showBetfairOdds ? (
        betfairLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23FFC8] mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading Betfair Exchange odds...</p>
          </div>
        ) : betfairGame && bookmaker ? (
          <div className="space-y-6">
            {bookmaker.markets.map((market) => (
              <div key={market.key}>
                {renderMarket(market)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 p-4 bg-gray-800 rounded-lg">
            No Betfair Exchange odds available for this game
          </div>
        )
      ) : game.bookmakers.length > 0 ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">
              Select Bookmaker
            </label>
            <select
              value={selectedBookmaker}
              onChange={(e) => setSelectedBookmaker(e.target.value)}
              className="w-full bg-gray-700 text-white rounded-md p-2"
            >
              {game.bookmakers.map((bookmaker) => (
                <option key={bookmaker.key} value={bookmaker.key}>
                  {bookmaker.title}
                </option>
              ))}
            </select>
          </div>

          {bookmaker ? (
            <div className="space-y-6">
              {bookmaker.markets.map((market) => (
                <div key={market.key}>
                  {renderMarket(market)}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 p-4">
              No bookmaker selected or available
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-400 p-4">
          No odds available for this game
        </div>
      )}
    </div>
  );
};