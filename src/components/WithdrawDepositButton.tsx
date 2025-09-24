import { findCurrentUser } from "@/data/user";
import Link from "next/link";
import React from "react";

import { PiHandDepositFill } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
const WithdrawDepositButton = async () => {
  const user = await findCurrentUser();
  if (!user) return null;
  return (
    <div className="flex gap-3 items-center justify-between py-4">
      <Link
        href="/deposit"
        className="flex flex-1 justify-center items-center font-bold text-center text-[#ffab49] rounded-xl border border-teal-800 border-solid bg-[#002632] decoration-orange-400 h-[46px] outline-orange-400 shadow-[rgb(0,38,49)_0px_2.304px_0px_0px]"
        aria-label="Deposit"
      >
        <PiHandDepositFill className="mr-3 w-5" />
        <span className="font-bold text-center text-[#ffab49] border-orange-400 decoration-orange-400 outline-orange-400">
          Deposit
        </span>
      </Link>
      <Link
        href={"/withdraw"}
        className="flex flex-1 justify-center items-center font-bold text-center text-[#ffab49] rounded-xl border border-teal-800 border-solid bg-[#002632] decoration-orange-400 h-[46px] outline-orange-400 shadow-[rgb(0,38,49)_0px_2.304px_0px_0px]"
        aria-label="Deposit"
      >
        <PiHandWithdrawFill className="mr-3 w-5" />
        <span className="font-bold text-center text-[#ffab49] border-orange-400 decoration-orange-400 outline-orange-400">
          Withdraw
        </span>
      </Link>
    </div>
  );
};

export default WithdrawDepositButton;
