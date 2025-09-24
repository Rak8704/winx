/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { UserAvatar } from "@/components/HeaderBalance";
import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hook/useCurrentUser";
import { useFetchWalletQuery } from "@/lib/features/walletApiSlice";
import { getCurrencySymbol } from "@/lib/utils";

const RewardHeader = () => {
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  const { data, refetch, error } = useFetchWalletQuery();

  const user : any = useCurrentUser();

  const balance = data?.payload ? Number(data.payload.balance) : 0;

  const handleCopyPlayerId = () => {
    navigator.clipboard.writeText(user?.playerId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshBalance = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

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

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative reward-header-bg rounded-b-full  p-2 h-[240px] flex items-center">
      {/* Toast Notification */}
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300 z-50 ${
          showToast ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-sm font-medium">Balance updated successfully</div>
        <div className="text-xs mt-1" suppressHydrationWarning>
          {lastUpdateTime.toLocaleTimeString()}
        </div>
      </div>

      <h2 className="text-[60px]   font-bold absolute left-1/2 -translate-x-1/2 top-5  text-transparent bg-[linear-gradient(#fff,#0000)] bg-clip-text">
        Reward
      </h2>

      <button
        className="cursor-pointer absolute top-4 left-5"
        onClick={handleBack}
      >
        <FaArrowLeftLong className="w-5 h-5 text-white" />
      </button>

      <div className=" flex items-center justify-between mb-4">
        <div className=" flex items-center">
          <div className="absolute -bottom-[25%] -translate-y-1/2 left-14">
            <div
              className={`overflow-x-hidden overflow-y-hidden p-0.5 mr-2 border border-t border-r border-b border-l border-solid bg-[linear-gradient(rgb(255,230,0),rgb(255,184,0))] border-orange-200 border-opacity-50   shadow-[hsl(51.23595505617977, 100%, 82.54901960784314%)_0px_1.9584px_0px_1.7px_inset,rgb(182,65,0)_0px_1.9584px_0px_0px]  w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full `}
            >
              <div className="flex overflow-x-hidden overflow-y-hidden relative justify-center items-center rounded-full size-full">
                <div className="overflow-x-hidden overflow-y-hidden rounded-full size-full">
                  <img
                    alt="User avatar"
                    src="https://images.51939393.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png"
                    className="overflow-x-clip overflow-y-clip size-full  object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.51939393.com//TCG_PROD_IMAGES/B2C/01_PROFILE/PROFILE/0.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-3 absolute left-[40%] -bottom-4 -translate-y-1/2">
            <h2 className="font-bold text-xl text-white">{user?.name}</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-200">
                Player ID: {user?.playerId}
              </span>
              <button
                onClick={handleCopyPlayerId}
                className="ml-2 text-xs bg-gray-200 hover:bg-gray-400 p-1 rounded cursor-pointer"
              >
                <FaCopy className="text-[#B0235F]" />
              </button>
            </div>

            <div className="flex items-center justify-between  ">
              <div>
                <div className="flex items-center">
                  <span
                    className="text-xl font-bold tracking-tighter text-white mt-2 transition-all duration-300 transform"
                    style={{
                      animation: isRefreshing
                        ? "none"
                        : "balancePulse 0.5s ease-out",
                    }}
                  >
                    {getCurrencySymbol(data?.payload?.currency || "BDT")}
                    {balance.toFixed(2)}
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
                    className="ml-2 text-xs bg-gray-200 hover:bg-gray-400 p-1.5 rounded cursor-pointer relative"
                    disabled={isRefreshing}
                  >
                    <FiRefreshCw className="text-[#B0235F]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardHeader;
