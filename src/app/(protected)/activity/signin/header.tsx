import { UserAvatar } from "@/components/HeaderBalance";
import React from "react";

interface HeaderProps {
  playerId: string;
  balance: number;
  profile: string;
  lastSigninBonus: number;
  totalSigninBonus: number;
}
const Header = ({
  playerId,
  balance,
  profile,
  lastSigninBonus,
  totalSigninBonus,
}: HeaderProps) => {
  return (
    <div className="h-[200px] signin-bonus-header-bg relative">
      <div className="flex items-center gap-4 px-6 py-4">
        <UserAvatar
          className="!w-[80px] !h-[80px] rounded-full"
          imageUrl={profile}
        />
        <div>
          <span className="text-base font-medium text-white">
            Player ID: {playerId}
          </span>
          <span className="text-xl font-bold tracking-tighter text-white  transition-all duration-300 transform block">
            ৳ {balance}
          </span>
        </div>
      </div>

      <div className="absolute w-[95%] mx-auto py-4 left-1/2 -translate-x-1/2 -bottom-20 -translate-y-1/2 bg-white shadow-sm flex justify-between items-center rounded-2xl">
        <div className=" flex-1 border-r-2">
          <span className="text-lg font-bold text-[#2476FF] block text-center">
            {lastSigninBonus}
          </span>
          <span className="text-sm font-normal text-gray-500 block text-center">
            Last signin
          </span>
        </div>
        <div className=" flex-1 border-r-2">
          <span className="text-lg font-bold text-[#FE3B44] block text-center">
            {totalSigninBonus}
          </span>
          <span className="text-sm font-normal text-gray-500 block text-center">
            Total Sign in Bonus
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
