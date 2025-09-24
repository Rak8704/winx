/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import moment from "moment";
// Import Swiper React components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import BkashCard from "@/components/cards/BkashCard";
import NagadCard from "./cards/NagadCard";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import {
  useFetchCardsQuery,
  useUpdateCardMutation,
} from "@/lib/features/cardSlice";
import { toast } from "sonner";
import { INTERNAL_SERVER_ERROR } from "@/error";
import Spiner from "./loader/Spiner";
import EmpryCard from "./EmpryCard";

import MyCardsSkleton from "./skelton/MyCardsSkleton";

const MyCards = () => {
  const { data, isLoading } = useFetchCardsQuery({ all: true });
  const cards = data?.cards;
  console.log({ cards });
  return (
    <div>
      {data && !isLoading && (
        <>
          <div className="py-4 pl-4">
            <h4 className="text-base md:text-lg font-semibold text-center">
              Bound E-Wallets : ({cards?.length}/5)
            </h4>
          </div>
          <div className="mt-6 flex flex-col">
            {cards?.map((card, i) => (
              <Card
                key={i}
                cardId={card.id}
                isActive={card.isActive}
                issueDate={card.createdAt}
                walletNumber={card.walletNumber}
              >
                {card.paymentWallet.walletName.toLowerCase() == "bkash" ? (
                  <BkashCard
                    bkashNumber={card.walletNumber}
                    cardNumber={card.cardNumber}
                    ownerName={card.container.ownerName}
                  />
                ) : (
                  <NagadCard
                    nagadNumber={card.walletNumber}
                    cardNumber={card.cardNumber}
                    ownerName={card.container.ownerName}
                  />
                )}
              </Card>
            ))}

            {cards?.length == 0 && <EmpryCard plusRedirect="/card" />}
          </div>
        </>
      )}

      {(!data || isLoading) && <MyCardsSkleton />}
    </div>
  );
};

export default MyCards;

interface CardProps {
  walletNumber: string;
  isActive: boolean;
  issueDate: Date;
  cardId: string;
  children: React.ReactNode;
}
export const Card = (props: CardProps) => {
  const { walletNumber, isActive, issueDate, children, cardId } = props;

  const [updateCardApi, { isLoading }] = useUpdateCardMutation();

  const handleUpdateCard = (isActive: boolean, cardId: string) => {
    updateCardApi({ id: cardId, isActive })
      .unwrap()
      .then(() => {})
      .catch((error: any) => {
        if (error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error(INTERNAL_SERVER_ERROR);
        }
      });
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center border-b pb-2">
        <div className="flex items-center gap-3 relative">
          <FaCreditCard className="w-5 h-5 " />
          <div>
            <p className="text-black text-sm font-semibold antialiased">
              {walletNumber}
            </p>
            <small className="text-[10px] text-gray-700 ">
              {moment(issueDate).calendar()}
            </small>
          </div>
          <div className="absolute top-0 -right-16">
            {isActive ? (
              <div
                className="px-2 py-2 w-[55px] h-[25px] flex justify-center items-center rounded-md bg-emerald-600 text-white text-xs font-medium"
                aria-label="active status label"
              >
                {isLoading ? <Spiner className="mx-auto" /> : "Active"}
              </div>
            ) : (
              <div
                className="px-2 py-1 w-[55px] h-[25px] flex justify-center items-center rounded-md bg-destructive text-white text-xs font-medium"
                aria-label="active status label"
              >
                {isLoading ? <Spiner className="mx-auto" /> : "Inactive"}
              </div>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <BsThreeDotsVertical className="text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleUpdateCard(!isActive, cardId)}
              className="hover:border-none px-2 cursor-pointer"
            >
              {isActive ? "Inactive" : "Active"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
};
