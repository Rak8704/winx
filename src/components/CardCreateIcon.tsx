/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { GoPlus } from "react-icons/go";

import Link from "next/link";
import { useFetchWalletsQuery } from "@/lib/features/paymentApiSlice";

const CardCreateIcon = () => {
  const { data, isLoading } = useFetchWalletsQuery();
  const wallets = data?.paymentWallets;

  return (
    <div>
      <Drawer>
        <DrawerTrigger
          className="cursor-pointer p-3 bg-blue-600 hover:bg-blue-700 hover:transition-colors rounded-full
          flex flex-col justify-center  items-center "
        >
          <GoPlus className="w-5 h-5 text-white" />
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <DrawerHeader>
            <DrawerTitle>Select Card Type</DrawerTitle>
          </DrawerHeader>
          <div className="pb-4 px-3">
            {wallets && !isLoading && (
              <>
                {wallets.map((w, i) => {
                  return (
                    <Link
                      key={i}
                      href={`/card?walletName=${w.walletName.toLowerCase()}`}
                      className="flex items-center gap-3 p-2 rounded-md border  mb-2"
                    >
                      <div className="p-1 flex justify-center items-center">
                        <img
                          src={w.walletLogo || '/games/provider/default-game.png'}
                          alt={w.walletName || 'Wallet logo'}
                          className="w-[40px] h-auto"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/games/provider/default-game.png';
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-950">
                          {w.walletName}
                        </h3>
                        <p className="text-gray-800 text-xs text-start">
                          You can make up to 5 cards
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </>
            )}
            {isLoading && <CardTypeSkeleton />}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const CardTypeSkeleton = () => {
  return (
    <div className="space-y-2 ">
      {/* Skeleton for Bkash */}
      <div className="flex items-center gap-4 p-2 border rounded-lg">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>

      {/* Skeleton for Nagad */}
      <div className="flex items-center gap-4 p-2 border rounded-lg">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default CardCreateIcon;
