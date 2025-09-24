import React from "react";

import Image from "next/image";

import { BiCoinStack } from "react-icons/bi";
import { ExtendedWithUserRewards } from "@/types/api/reward";
import { useClamInvitationRewardMutation } from "@/lib/features/rewardApiSlice";
import { toast } from "sonner";
import { INTERNAL_SERVER_ERROR } from "@/error";

interface RewardsProps {
  rewards: ExtendedWithUserRewards[];
}

const Rewards = ({ rewards }: RewardsProps) => {
  const [clamRewardApi, { isLoading }] = useClamInvitationRewardMutation();

  const handleClamReward = (reward: ExtendedWithUserRewards) => {
    if (reward.isClamed) {
      toast.success("You already clamed this reward");
      return;
    }

    if (reward.targetReferral !== reward.completedReferral) {
      toast.success("Please refer more users to get it");
      return;
    }

    clamRewardApi({ id: reward.id })
      .unwrap()
      .then()
      .catch((error) => {
        if (error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error(INTERNAL_SERVER_ERROR);
        }
      });
  };
  return (
    <div>
      <div className="space-y-3">
        {rewards.map((reward, i) => (
          <div
            key={i}
            className="bg-[linear-gradient(180deg,_rgba(243,247,251,0.4)_0%,_rgba(224,233,241,0.4))] rounded-md p-2 flex items-center gap-3 shadow-sm"
          >
            <div className="w-[15%] ">
              <Image
                src={reward.rewardImg}
                width={45}
                height={50}
                alt={`Over ${reward.targetReferral} valid referral in total.`}
                className="w-[40px] mx-auto"
              />
            </div>

            <div className="w-[85%] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#9B9EA0]">
                  Over {reward.targetReferral} valid referral in total
                </h4>
                <div className="flex items-center gap-1 font-bold text-[#9B9EA0]">
                  <BiCoinStack className="w-3 h-3 " />
                  {+reward.prize}
                </div>
              </div>

              <div>
                <h3 className="bg-[linear-gradient(113deg,_#43cbff,_#9708cc)]  text-transparent bg-clip-text text-lg font-bold">
                  {reward.completedReferral}/{" "}
                  <span className="text-[8px] font-bold text-black/50">
                    {reward.targetReferral}
                  </span>{" "}
                </h3>

                <button
                  onClick={() => handleClamReward(reward)}
                  disabled={
                    reward.isClamed ||
                    reward.targetReferral != reward.completedReferral ||
                    isLoading
                  }
                  className={`bg-[linear-gradient(113deg,_#43cbff,_#9708cc)] text-white text-xs font-medium px-2 py-1 rounded-md cursor-pointer ${
                    reward.isClamed && "opacity-50"
                  } `}
                >
                  {reward.isClamed
                    ? "Clamed"
                    : reward.targetReferral == reward.completedReferral
                    ? "Clam"
                    : "Available"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
