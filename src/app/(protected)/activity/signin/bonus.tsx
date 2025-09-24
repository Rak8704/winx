"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Header from "./header";
import SigninBonusPlan from "./plan";
import BonusCards from "./bonus-cards";
import useCurrentUser from "@/hook/useCurrentUser";
import { useFindSigninBonusRewardsDataQuery } from "@/lib/features/rewardApiSlice";
import Rules from "./rules";

const SigninBonus = () => {
  const user: any = useCurrentUser();

  const { data, isLoading } = useFindSigninBonusRewardsDataQuery();
  console.log({ data });
  const statictic = data?.statictic;

  const nextClaimAvailable = data?.nextClaimAvailable;

  return (
    <div>
      {(data || !isLoading) && (
        <>
          <Header
            balance={user.wallet ? +user.wallet.balance : 0}
            lastSigninBonus={statictic?.lastSigninIncome || 0}
            playerId={user.playerId}
            profile="https://images.51939393.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png"
            totalSigninBonus={statictic?.totalSigninIncome || 0}
          />
          <SigninBonusPlan nextClaimAvailable={nextClaimAvailable} />
          <BonusCards rewards={data.rewards} />
          <Rules />
        </>
      )}
      {!data && isLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default SigninBonus;
