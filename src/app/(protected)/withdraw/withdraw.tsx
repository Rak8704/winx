"use client";

import React from "react";
import {
  useFetchWithdrawPageDataQuery,
  useFetchWithdrawWalletQuery,
} from "@/lib/features/withdrawSlice";
import WithdrawInfo from "./withdraw-info";
import WithdrawForm from "./withdraw-form";

const Withdraw = () => {
  const { data: withdrwData, isLoading: withdrawLoading } =
    useFetchWithdrawPageDataQuery();

  const { data, isLoading: walletLoading } = useFetchWithdrawWalletQuery();
  const wallets = data?.payload?.wallets;
  
  return (
    <>
      {withdrwData && !withdrawLoading && !walletLoading && wallets && (
        <>
          <WithdrawInfo
            availableBalance={withdrwData.availableBalance}
            mainBalance={withdrwData.mainBalance}
            remainingWithdrawal={withdrwData.remainingWithdrawal}
            turnOver={withdrwData.turnOver}
          />
          <WithdrawForm
            wallets={wallets}
            
          />
        </>
      )}

      {(!withdrwData || withdrawLoading || walletLoading || !wallets) && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </>
  );
};

export default Withdraw;
