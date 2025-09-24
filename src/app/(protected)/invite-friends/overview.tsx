/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { formatBDT } from "@/lib/utils";
import React, { useEffect, useState } from "react";

import facebook from "@/../public/icons/social-media/facebook.png";
import telegram from "@/../public/icons/social-media/telegram.png";
import whatsapp from "@/../public/icons/social-media/whatsapp.png";

import reward_1 from "@/../public/icons/rewards/reward-1.png";
import reward_2 from "@/../public/icons/rewards/reward-2.png";
import reward_3 from "@/../public/icons/rewards/reward-3.png";
import reward_4 from "@/../public/icons/rewards/reward-4.png";

import Image from "next/image";

import { FaLink } from "react-icons/fa6";
import { StaticticType } from "@/types/api/reward";
import useCurrentUser from "@/hook/useCurrentUser";

interface OverviewProps {
  statictic: StaticticType;
}
const Overview = ({ statictic }: OverviewProps) => {
  const user: any = useCurrentUser();

  const { registersCount, todayIncome, validReferral, totalIncome } = statictic;
  return (
    <div className="space-y-3">
      <Statictic
        registersCount={registersCount}
        todayIncome={todayIncome}
        validReferral={validReferral}
        totalIncome={totalIncome}
      />
      <InviteLink invitationCode={user.referId} />
      <ReleasedReward />
    </div>
  );
};

export default Overview;

const Statictic = ({
  registersCount,
  todayIncome,
  validReferral,
  totalIncome,
}: StaticticType) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-[linear-gradient(108deg,_#abdcff,_#0396ff)]  p-3 rounded-sm">
        <span className="text-[#ebf7ff] font-semibold text-sm text-center block">
          Today&rsquo;s Income
        </span>
        <span className="text-2xl font-bold text-white text-shadow-sm block text-center">
          {formatBDT(todayIncome)}
        </span>
      </div>

      <div className="bg-[linear-gradient(108deg,_#ce9ffc,_#7367f0)] p-3 rounded-sm ">
        <span className="text-[#ebf7ff] font-semibold text-sm text-center block">
          Total Income
        </span>
        <span className="text-2xl font-bold text-white text-shadow-sm block text-center">
          {formatBDT(totalIncome)}
        </span>
      </div>

      <div className="bg-[linear-gradient(108deg,_#abdcff,_#0396ff)] p-3 rounded-sm ">
        <span className="text-[#ebf7ff] font-semibold text-sm text-center block">
          Registers
        </span>
        <span className="text-3xl font-bold text-white text-shadow-sm block text-center">
          {registersCount}
        </span>
      </div>

      <div className="bg-[linear-gradient(108deg,_#ce9ffc,_#7367f0)] p-3 rounded-sm ">
        <span className="text-[#ebf7ff] font-semibold text-sm text-center block">
          Valid Referral
        </span>
        <span className="text-3xl font-bold text-white text-shadow-sm block text-center">
          {validReferral}
        </span>
      </div>
    </div>
  );
};

const InviteLink = ({ invitationCode }: { invitationCode: string }) => {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.location.hostname);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationLink);
  };

  const invitationLink = `${domain}/register?r=${invitationCode}`;

  return (
    <div className="bg-[#dae2e9] p-2 space-y-6 py-5 rounded-lg">
      <h3 className="text-xl font-semibold text-[#3B2987] text-center">
        Share to your friends
      </h3>
      <div className="flex gap-2 items-center justify-center">
        <span className="text-[#566073] text-sm font-semibold ">
          Share to your friends
        </span>

        <div className="flex gap-2 items-center">
          <a href="facebook.com">
            <Image
              src={facebook}
              alt="facebook"
              className="w-[40px] aspect-square"
            />
          </a>

          <a href="facebook.com">
            <Image
              src={whatsapp}
              alt="whatsapp"
              className="w-[40px] aspect-square"
            />
          </a>

          <a href="facebook.com">
            <Image
              src={telegram}
              alt="telegram"
              className="w-[40px] aspect-square"
            />
          </a>
        </div>
      </div>

      <div className="relative bg-white px-3 py-2 rounded-sm flex items-center gap-3">
        <div className="flex items-center gap-2">
          <FaLink className="w-5 h-5 text-black" />
          <span>{invitationLink}</span>

          <button
            onClick={handleCopy}
            className="absolute top-1/2 -translate-y-1/2 px-2 py-1 rounded-full right-4 cursor-pointer bg-[linear-gradient(135deg,_#6b73ff,_#000dff)] text-white text-sm font-semibold"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

const ReleasedReward = () => {
  const rewards = [
    {
      stiker: reward_1,
      label: "Invitation Rewards",
      prize: "21,257,956.00",
      clamed: "67620",
    },
    {
      stiker: reward_2,
      label: "Achievement Rewards",
      prize: "457,250.00",
      clamed: "9126",
    },
    {
      stiker: reward_3,
      label: "Deposit Rebate",
      prize: "21,257,956.00",
      clamed: "71525",
    },
    {
      stiker: reward_4,
      label: "Betting Rebate",
      prize: "21,190,073.52",
      clamed: "78159",
    },
  ];

  return (
    <div className="py-5">
      <h3 className="text-[#1b1b4b] text-3xl font-bold text-center my-4">
        Rewards Released to Date
      </h3>
      <div className="space-y-3">
        {rewards.map((reward, i) => (
          <div
            className="bg-[linear-gradient(180deg,_#f3f7fb_0,_#e0e9f1)] rounded-lg p-3 flex gap-2 "
            key={i}
          >
            <div className="w-[30%]">
              <Image
                src={reward.stiker}
                alt={reward.label}
                className="w-[70px] mx-auto"
              />
            </div>
            <div className="w-[70%]">
              <h5 className="text-lg font-semibold text-[#566073]">
                {reward.label}
              </h5>
              <h4 className="text-2xl font-bold text-[#3b2987]">
                ৳ {reward.prize}
              </h4>
              <span className="text-base font-normal text-black/50">
                {reward.clamed} Clamed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
