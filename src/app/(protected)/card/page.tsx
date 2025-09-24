/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import SiteHeader from "@/components/SiteHeader";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHasCardContainerQuery } from "@/lib/features/depositApiSlice";
import { useFetchWalletsQuery } from "@/lib/features/paymentApiSlice";
import { cardCreateSchema, newCardCreateSchema } from "@/schema";
import { FormControl, FormLabel } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import zod from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateCardMutation,
  useNewCreateCardMutation,
} from "@/lib/features/cardSlice";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import { INTERNAL_SERVER_ERROR } from "@/error";
import CardViewModal from "@/components/cards/CardViewModal";
import { ExtendedCard } from "@/types/api/card";
import BkashCard from "@/components/cards/BkashCard";
import NagadCard from "@/components/cards/NagadCard";

const CardPage = () => {
  const [createdCard, setCreateCard] = useState<ExtendedCard>();

  const walletName = useSearchParams().get("walletName");

  const { data, isLoading } = useFetchWalletsQuery();
  const wallets = data?.paymentWallets;

  const { data: containerCheckData, isLoading: containerChecking } =
    useHasCardContainerQuery();
  const hasCardContainer = containerCheckData?.hasCardContainer;

  const [selectedCardType, setCardType] =
    useState<Prisma.PaymentWalletGetPayload<object>>();

  const newCardForm = useForm<zod.infer<typeof newCardCreateSchema>>({
    defaultValues: {
      password: "",
      payeerName: "",
      walletNumber: "",
      paymentWalletId: "",
    },
    resolver: zodResolver(newCardCreateSchema),
  });

  const cardForm = useForm<zod.infer<typeof cardCreateSchema>>({
    defaultValues: {
      password: "",
      walletNumber: "",
      paymentWalletId: "",
    },
    resolver: zodResolver(cardCreateSchema),
  });

  const [createCardApi, { isLoading: cardCreateLoading }] =
    useCreateCardMutation();
  const [createNewCardApi, { isLoading: cardNewCreateLoading }] =
    useNewCreateCardMutation();

  const handleCreateNewCard = (data: zod.infer<typeof newCardCreateSchema>) => {
    createNewCardApi({
      ownerName: data.payeerName,
      password: data.password,
      paymentWalletId: data.paymentWalletId,
      walletNumber: data.walletNumber,
    })
      .unwrap()
      .then((res) => {
        setCreateCard(res.card);
      })
      .catch((error: any) => {
        if (error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error(INTERNAL_SERVER_ERROR);
        }
      });
  };

  const handleCreateCard = (data: zod.infer<typeof cardCreateSchema>) => {
    createCardApi({
      password: data.password,
      paymentWalletId: data.paymentWalletId,
      walletNumber: data.walletNumber,
    })
      .unwrap()
      .then((res) => {
        setCreateCard(res.card);
      })
      .catch((error: any) => {
        if (error.data.error) {
          toast.error(error.data.error);
        } else {
          toast.error(INTERNAL_SERVER_ERROR);
        }
      });
  };

  useEffect(() => {
    if (selectedCardType && containerCheckData) {
      if (hasCardContainer) {
        cardForm.reset({
          password: "",
          walletNumber: "",
          paymentWalletId: selectedCardType.id,
        });
      } else {
        newCardForm.reset({
          password: "",
          payeerName: "",
          walletNumber: "",
          paymentWalletId: selectedCardType.id,
        });
      }
    }
  }, [selectedCardType, containerCheckData]);
  useEffect(() => {
    const setDefautWallet = () => {
      setCardType(wallets![0]);
    };

    if (wallets && !walletName) {
      setDefautWallet();
    } else if (wallets && walletName) {
      const selectedCard = wallets.find(
        (wallet) =>
          wallet.walletName.toLocaleLowerCase() ==
          walletName.toLocaleLowerCase()
      );

      if (!selectedCard) {
        setDefautWallet();
      } else {
        setCardType(selectedCard);
      }
    }
  }, [wallets, walletName]);

  const isFormSubmiting = cardCreateLoading || cardNewCreateLoading;



  return (
    <div className="">
      <SiteHeader title="Create New Card"></SiteHeader>

      <main className="p-3">
        {!isLoading && !containerChecking && (
          <div className="p-3 border rounded-md">
            <div className=" mx-auto ">
              <Label className="block mb-4 text-center">Select a Wallet</Label>
              {wallets && !isLoading && (
                <div className="grid grid-cols-2 gap-4">
                  {wallets.map((wallet, i) => {
                    return (
                      <button
                        disabled={isFormSubmiting}
                        key={i}
                        onClick={() => setCardType(wallet)}
                        className={`flex flex-col items-center p-2 border rounded-2xl transition-all duration-200
              ${
                selectedCardType?.walletName === wallet.walletName
                  ? "border-blue-500 shadow-lg scale-105"
                  : "border-gray-300"
              }
              hover:shadow-md hover:scale-105`}
                      >
                        <img
                          src={wallet.walletLogo}
                          alt={wallet.walletName}
                          className="w-16 h-16 object-contain "
                        />
                        <span className="text-sm font-medium capitalize">
                          {wallet.walletName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <Separator className="my-5" />

            {hasCardContainer ? (
              <Form {...cardForm}>
                <form onSubmit={cardForm.handleSubmit(handleCreateCard)}>
                  <FormField
                    control={cardForm.control}
                    name="walletNumber"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between relative mb-14">
                        <FormLabel>Set Number</FormLabel>
                        <FormControl className="w-[220px]">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Wallet number"
                            className="!w-full disabled:cursor-not-allowed"
                            disabled={isFormSubmiting}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription className="absolute max-w-[220px] top-[90%] right-0">
                          *Remember You can create One Card for One Wallet
                          Number
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <Separator className="my-5" />

                  <FormField
                    control={cardForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <FormControl className="w-[220px]">
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password "
                            disabled={isFormSubmiting}
                            className="disabled:cursor-not-allowed"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {cardForm.formState.errors.root && (
                    <span className="text-[0.8rem] mt-5 block font-medium text-destructive">
                      *{cardForm.formState.errors.root.message}
                    </span>
                  )}

                  <button
                    disabled={isFormSubmiting}
                    className="text-white disabled:cursor-not-allowed disabled:bg-blue-800 bg-blue-600 hover:bg-blue-700 hover:transition-colors px-4 py-2 cursor-pointer rounded-sm shadow-sm w-full mt-12"
                  >
                    {isFormSubmiting ? "Creating..." : "Create"}
                  </button>
                </form>
              </Form>
            ) : (
              <Form {...newCardForm}>
                <form onSubmit={newCardForm.handleSubmit(handleCreateNewCard)}>
                  <FormField
                    control={newCardForm.control}
                    name="payeerName"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between relative mb-12">
                        <FormLabel>Payeer Name</FormLabel>
                        <FormControl className="w-[220px]">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Payeer name"
                            disabled={isFormSubmiting}
                            className="disabled:cursor-not-allowed"
                          />
                        </FormControl>
                        <FormDescription className="absolute max-w-[220px] top-[90%] right-0">
                          *Your Real Payeer Name That Used for wallet
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={newCardForm.control}
                    name="walletNumber"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between relative mb-14">
                        <FormLabel>Set Number</FormLabel>
                        <FormControl className="w-[220px]">
                          <Input
                            {...field}
                            type="text"
                            placeholder="Wallet number"
                            className="!w-full disabled:cursor-not-allowed"
                            disabled={isFormSubmiting}
                          />
                        </FormControl>

                        <FormDescription className="absolute max-w-[220px] top-[90%] right-0">
                          *Remember You can create One Card for One Wallet
                          Number
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <Separator className="my-5" />

                  <FormField
                    control={newCardForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between relative">
                        <FormLabel>Set Password</FormLabel>
                        <FormControl className="w-[220px]">
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password "
                            disabled={isFormSubmiting}
                            className="disabled:cursor-not-allowed"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {newCardForm.formState.errors.root && (
                    <span className="text-[0.8rem] mt-5 block font-medium text-destructive">
                      *{newCardForm.formState.errors.root.message}
                    </span>
                  )}

                  <button
                    disabled={isFormSubmiting}
                    className="text-white disabled:cursor-not-allowed disabled:bg-blue-800 bg-blue-600 hover:bg-blue-700 hover:transition-colors px-4 py-2 cursor-pointer rounded-sm shadow-sm w-full mt-7"
                  >
                    {isFormSubmiting ? "Creating..." : "Create"}
                  </button>
                </form>
              </Form>
            )}
          </div>
        )}

        {!!createdCard && (
          <CardViewModal
            onClose={() => setCreateCard(undefined)}
            opne={!!createdCard}
          >
            {createdCard!.paymentWallet.walletName.toLowerCase() == "bkash" ? (
              <BkashCard
                cardNumber={createdCard!.cardNumber}
                bkashNumber={createdCard!.walletNumber}
                ownerName={createdCard!.container.ownerName}
              />
            ) : (
              <NagadCard
                cardNumber={createdCard!.cardNumber}
                nagadNumber={createdCard!.walletNumber}
                ownerName={createdCard!.container.ownerName}
              />
            )}
          </CardViewModal>
        )}

        {(isLoading || containerChecking) && <CardCreateSeketon />}
      </main>
    </div>
  );
};

export default CardPage;

const CardCreateSeketon = () => {
  return (
    <div className="max-w-md mx-auto p-2 border rounded-xl shadow-sm space-y-6">
      <Skeleton className="h-6 w-32 mx-auto" />

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border space-y-2">
          <Skeleton className="h-16 w-16 mx-auto" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
        <div className="p-4 rounded-2xl border space-y-2">
          <Skeleton className="h-16 w-16 mx-auto" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-3 w-3/4" />
      </div>

      <div className="space-y-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
};
