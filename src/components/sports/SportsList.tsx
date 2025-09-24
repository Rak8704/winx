"use client";

import { Sport } from "@/types/sports";
import { useEffect, useState } from "react";
import { useSportsStore } from "@/lib/store/sportsStore";

interface SportsListProps {
  onSelectSport: (sportKey: string) => void;
  selectedSportKey?: string;
}

export const SportsList = ({ onSelectSport, selectedSportKey }: SportsListProps) => {
  const { sports, fetchAllSports, isLoading, error } = useSportsStore();
  const [groupedSports, setGroupedSports] = useState<Record<string, Sport[]>>({});

  useEffect(() => {
    fetchAllSports();
  }, [fetchAllSports]);

  useEffect(() => {
    // Group sports by their group property
    const grouped = sports.reduce<Record<string, Sport[]>>((acc, sport) => {
      if (!acc[sport.group]) {
        acc[sport.group] = [];
      }
      acc[sport.group].push(sport);
      return acc;
    }, {});
    
    setGroupedSports(grouped);
  }, [sports]);

  if (isLoading && sports.length === 0) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error loading sports: {error}</p>
        <button 
          onClick={() => fetchAllSports()}
          className="mt-2 px-4 py-2 bg-[#23FFC8] text-black rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-2 overflow-y-auto max-h-[calc(100vh-200px)]">
      {Object.entries(groupedSports).map(([group, sportsList]) => (
        <div key={group} className="mb-4">
          <h3 className="text-[#23FFC8] font-semibold mb-2">{group}</h3>
          <div className="space-y-1">
            {sportsList.map((sport) => (
              <button
                key={sport.key}
                onClick={() => onSelectSport(sport.key)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedSportKey === sport.key
                    ? "bg-[#23FFC8] text-black"
                    : "hover:bg-gray-700 text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{sport.title}</span>
                  {sport.active && (
                    <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">
                      Live
                    </span>
                  )}
                </div>
                {sport.description && (
                  <p className="text-xs text-gray-400">{sport.description}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};