/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import money from "@/../public/icons/rewards/money.png";
import beg from "@/../public/icons/rewards/bag.png";
import Image from "next/image";
import { useClaimSignRewardMutation } from "@/lib/features/rewardApiSlice";
import toast from "react-hot-toast";
import { INTERNAL_SERVER_ERROR } from "@/error";

const BonusCards = ({ rewards }: { rewards: any[] }) => {
  return (
    <div className="bg-white p-4 mt-5  grid grid-cols-3 gap-3">
      {rewards.map((reward, i) => (
        <BonusCard reward={reward} key={i} />
      ))}
    </div>
  );
};

export default BonusCards;

interface BonusCardProps {
  reward: any;
}
const BonusCard = ({ reward }: BonusCardProps) => {
  const [claimApi, { isLoading }] = useClaimSignRewardMutation();

  const handleClaimReward = (id: string) => {
    claimApi({ id })
      .unwrap()
      .catch((error) => {
        if (error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error(INTERNAL_SERVER_ERROR);
        }
      });
  };

  return (
    <div className="rounded-lg border border-green-200 overflow-hidden">
      <h4 className="text-sm py-1 text-white text-center font-semibold bg-blue-600">
        Day {reward.day}
      </h4>

      <div className="bg-[#FBF4ED]">
        <div className="z-[2] relative">
          <div className="absolute z-[-1] w-full h-[80px] signin-bonus-bg-effect"></div>
          <div className="flex items-center gap-2 justify-between px-2 py-4">
            <Image
              src={money}
              alt="Money"
              className="w-[50px] h-auto select-none"
            />
            <Image
              src={beg}
              alt="Beg"
              className="w-[50px] h-auto select-none"
            />
          </div>
          <div className="p-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-black/75 ">
                Bonus
              </span>
              <span className="text-xs font-bold text-black/75">
                ৳ {reward.prize}
              </span>
            </div>

            <button
              onClick={() => handleClaimReward(reward.id)}
              disabled={
                reward.status == "AVAILABLE" ||
                reward.status == "CLAIMED" ||
                isLoading
              }
              className={` ${
                reward.status == "CLAIMED"
                  ? "bg-gray-500"
                  : "bg-gradient-to-r from-[#f8493f] to-[#fd603f]"
              } w-full py-1 rounded-full text-sm text-white cursor-pointer mt-4`}
            >
              {reward.status == "CLAIMED"
                ? "Claimed"
                : reward.status == "AVAILABLE"
                ? "Signin"
                : "Claim"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
