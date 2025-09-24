import Image from "next/image";
import Link from "next/link";
import React from "react";

import invitaionBg from "@/../public/bonus-cards/invitation-bonus-icon.png";
import signinBg from "@/../public/bonus-cards/signin-bonus-icon.png";

const RewardCards = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link
        href="/activity/signin"
        className="signin-bonus-bg flex justify-center items-center w-full h-[160px] rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center w-[60px] h-[60px] mx-auto rounded-full bg-white">
            <Image
              src={signinBg}
              alt="invite"
              className="w-[30px]"
              placeholder="blur"
            />
          </div>

          <span className="text-white text-sm font-medium block text-center">
            Signin
          </span>
        </div>
      </Link>

      <Link
        href="/invite-friends"
        className="invitaion-bonus-bg flex justify-center items-center w-full h-[160px] rounded-xl"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center w-[60px] h-[60px] mx-auto rounded-full bg-white">
            <Image
              src={invitaionBg}
              alt="invite"
              className="w-[30px]"
              placeholder="blur"
            />
          </div>

          <span className="text-white text-sm font-medium block text-center">
            Invite Friends
          </span>
        </div>
      </Link>
    </div>
  );
};

export default RewardCards;
