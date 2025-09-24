
// export default App;
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import { UserAvatar } from "@/components/HeaderBalance";
import React, { useState, useEffect } from "react";
import { PiHandDepositFill } from "react-icons/pi";
import { FiRefreshCw } from "react-icons/fi";
import { FaCopy } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";
import { PiHandWithdrawFill } from "react-icons/pi";
import { FaGift } from "react-icons/fa";
import { LuHistory } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { FaCircleUser } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { FiDownload } from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { GiFishMonster } from "react-icons/gi";
import Link from "next/link";
import { useFetchWalletQuery } from "@/lib/features/walletApiSlice";
import { getCurrencySymbol } from "@/lib/utils";
import useCurrentUser from "@/hook/useCurrentUser";
import { Skeleton } from "@/components/ui/skeleton";
import AuthModal from "@/components/logout-modal";
import LogOutModal from "@/components/logout-modal";
const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  const user: any = useCurrentUser();
  const {
    data,
    isLoading: walletLoading,
    refetch,
    isFetching: walletRetching,
  } = useFetchWalletQuery();

  const balance = data?.payload ? Number(data.payload.balance) : 0;

  const handleCopyPlayerId = () => {
    navigator.clipboard.writeText("BT78945612");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshBalance = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    refetch();

    setLastUpdateTime(new Date());
    setShowToast(true);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="bg-[url(https://c.animaapp.com/m9drzmnaxdV67z/img/background.png)] bg-cover bg-[50%_50%] w-full min-h-screen px-2 py-3 text-gray-800 pb-16 md:pb-4 md:flex md:flex-col md:items-center">
      {/* Main Container for Desktop */}
      <div className="md:max-w-4xl md:w-full">
        {/* Toast Notification */}
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${
            showToast ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="text-sm font-medium">
            Balance updated successfully
          </div>
          <div className="text-xs mt-1" suppressHydrationWarning>
            {lastUpdateTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Profile Section */}
        <div
          className="text-white px-4 py-5 rounded-b-xl wallet-bg md:rounded-xl md:mt-4"
          style={{
            borderRadius: 36.4,
            borderBlockEnd: "1px var(--color-cyan-53,rgb(10, 104, 81)) solid",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <UserAvatar imageUrl="https://images.51939393.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png" />
              <div className="ml-3">
                <h2 className="font-medium text-lg md:text-xl">{user?.name}</h2>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-200 md:text-base">
                    Player ID: {user?.playerId}
                  </span>
                  <button
                    onClick={handleCopyPlayerId}
                    className="ml-2 text-xs bg-gray-700 hover:bg-gray-600 p-1 rounded cursor-pointer md:text-sm"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
            <LogOutModal>
              <button className="text-white p-2 rounded-full hover:bg-[#00292f] cursor-pointer">
                <IoLogOut className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </LogOutModal>
          </div>
          <div className="flex items-center justify-between rounded-lg p-3">
            <div>
              <span className="text-xs text-[#23FFC8] md:text-sm">Balance</span>
              <div className="flex items-center">
                <span
                  className="text-xl font-semibold text-[#23FFC8] transition-all duration-300 transform md:text-2xl"
                  style={{
                    animation: isRefreshing
                      ? "none"
                      : "balancePulse 0.5s ease-out",
                  }}
                >
                  {(walletLoading || walletRetching) && (
                    <Skeleton className="w-[80px] h-[30px] rounded-md bg-[#124A46]"></Skeleton>
                  )}
                  {!walletLoading && !walletRetching && data && (
                    <>
                      {getCurrencySymbol("BDT")}
                      {balance.toFixed(2)}
                    </>
                  )}
                </span>
                <style>
                  {`
                    @keyframes balancePulse {
                      0% { transform: scale(1); }
                      50% { transform: scale(1.05); }
                      100% { transform: scale(1); }
                    }
                  `}
                </style>
                <button
                  onClick={handleRefreshBalance}
                  className="ml-2 text-xs bg-gray-700 hover:bg-gray-600 p-1.5 rounded cursor-pointer relative md:text-sm"
                  disabled={isRefreshing}
                >
                  <FiRefreshCw
                    className={`${isRefreshing ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-3 gap-2 px-4 py-2 md:gap-4 md:py-4">
          <Link href="/deposit">
            <button className="font-bold text-center text-orange-700 bg-teal-900 rounded-3xl border border-solid bg-[linear-gradient(rgb(255,230,0),rgb(255,184,0))] border-orange-200 border-opacity-50 leading-[50px] w-full shadow-[rgb(255,242,166)_0px_3.64267px_0px_1px_inset,rgb(182,65,0)_0px_3.64267px_0px_0px] flex justify-center items-center h-[60px] md:h-[70px]">
              <PiHandDepositFill className="text-xl mb-1 w-6 h-6 gap-3 md:w-7 md:h-7" />
              <span className="text-lg font-medium md:text-xl pb-1">
                Deposit
              </span>
            </button>
          </Link>
          <Link href="/withdraw">
            <button className="font-bold text-center text-orange-700 bg-teal-900 rounded-3xl border border-solid bg-[linear-gradient(rgb(255,230,0),rgb(255,184,0))] border-orange-200 border-opacity-50 leading-[50px] w-full shadow-[rgb(255,242,166)_0px_3.64267px_0px_1px_inset,rgb(182,65,0)_0px_3.64267px_0px_0px] flex justify-center items-center  h-[60px] gap-1 md:gap-2 md:h-[70px]">
              <PiHandWithdrawFill className="text-xl mb-1 w-6 h-6 md:w-7 md:h-7" />
              <span className="text-lg font-medium md:text-xl pb-1">
                Withdraw
              </span>
            </button>
          </Link>
          <Link href="/my-cards">
            <button className="font-bold text-center text-orange-700 bg-teal-900 rounded-3xl border border-solid bg-[linear-gradient(rgb(255,230,0),rgb(255,184,0))] border-orange-200 border-opacity-50 leading-[50px] w-full shadow-[rgb(255,242,166)_0px_3.64267px_0px_1px_inset,rgb(182,65,0)_0px_3.64267px_0px_0px] flex justify-center items-center gap-1 md:gap-2 h-[60px] md:h-[70px]">
              <FaCreditCard className="text-xl mb-1 w-5 h-5 md:w-6 md:h-6" />
              <span className="text-lg font-medium md:text-xl pb-1">
                My Card
              </span>
            </button>
          </Link>
        </div>

        {/* Menu Section */}
        <div className="flex-1 px-4 py-3 pb-8 md:py-6">
          <h3 className="text-lg font-medium mb-3 text-white md:text-xl md:mb-6">
            Member Menu
          </h3>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 md:gap-y-8 md:gap-x-4">
            {/* Row 1 */}
            <Link
              href="/rewardCenter"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <FaGift className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Reward
              </span>
            </Link>

            <Link
              href="/profitandloss"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <FaChartLine className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Profit/Loss
              </span>
            </Link>

            {/* Row 2 */}
            <Link
              href="/history?type=deposit"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <FaFileInvoiceDollar className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Deposit Record
              </span>
            </Link>

            <Link
              href={"/history?type=withdraw"}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center mb-1 shadow-sm md:w-14 md:h-14">
                <LuNotebookText className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Withdraw Record
              </span>
            </Link>
            <Link
              href="/my-account"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <FaCircleUser className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                My Account
              </span>
            </Link>

            {/* Row 3 */}
            <Link
              href="/security"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <MdSecurity className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Security Center
              </span>
            </Link>
            <Link
              href="/invite-friends"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <TiUserAdd className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Invite Friend
              </span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <FiDownload className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Download App
              </span>
            </Link>

            {/* Row 4 */}
            <Link
              href="/support"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <MdOutlineSupportAgent className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Customer Center
              </span>
            </Link>
            
            {/* Fishing Games Link */}
            <Link
              href="/fish"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <GiFishMonster className="text-xl text-white md:text-2xl" />
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Fish Games
              </span>
            </Link>
            
            {/* Poker Games Link */}
            <Link
              href="/poker"
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-teal-900/75 border border-x-teal-600 flex items-center justify-center shadow-sm md:w-14 md:h-14">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-xl text-white md:text-2xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 12c3-2 6-2 6 2s-3 2-6 2-6-2-6-2 3-2 6-2z"/>
                  <path d="M4 12h16"/>
                  <path d="M12 4v16"/>
                </svg>
              </div>
              <span className="text-xs text-center text-white mt-1 md:text-sm">
                Poker Games
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
