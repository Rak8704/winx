/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import zod from "zod";
import { withdrawSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMakeWithdrawMutation } from "@/lib/features/withdrawSlice";
import { toast } from "sonner";
import InvoiceModal from "./invoice-modal";
import { Prisma } from "@prisma/client";
import { CiWallet } from "react-icons/ci";
import PaymentMethod from "@/components/PaymentMethod";
import { INTERNAL_SERVER_ERROR } from "@/error";

interface WithdrawFormProps {
  wallets: any;
}

const WithdrawForm = ({ wallets }: WithdrawFormProps) => {
  const [withdraw, setWithdraw] =
    useState<Prisma.WithdrawGetPayload<{ include: { card: true } }>>();

  const form = useForm<zod.infer<typeof withdrawSchema>>({
    defaultValues: { amount: "", password: "", walletNumber: "" },
    resolver: zodResolver(withdrawSchema),
  });

  const [makeWithdrawApi, { isLoading }] = useMakeWithdrawMutation();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  const handleWithdraw = (data: zod.infer<typeof withdrawSchema>) => {
    makeWithdrawApi({
      amount: +data.amount,
      account_number: data.walletNumber,
      password: data.password,
      ps: selectedPaymentMethod.name,
    })
      .unwrap()
      .then((res) => {
        toast.success("Withdrawal request submitted successfully");
        console.log({ res });
      })
      .catch((error) => {
        if (error.data.message) {
          toast.error(error.data.message);
        } else {
          toast.error(INTERNAL_SERVER_ERROR);
        }
      });
  };

  useEffect(() => {
    if (wallets) {
      setSelectedPaymentMethod(wallets[0]);
    }
  }, [wallets]);
  return (
    <>
      <div>
        <section className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Payment Method
          </h2>
          <div className="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar">
            <div
              className={`flex-shrink-0 mx-1 cursor-pointer whitespace-nowrap`}
            >
              <div
                className={`w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center p-3 transition-all ${"border-gray-200 "}`}
              >
                <CiWallet className="text-2xl text-gray-600" />
                <span className={`mt-2 text-sm font-medium ${"text-gray-700"}`}>
                  e-Wallet
                </span>
              </div>
            </div>

            {wallets?.map((pw: any, i: number) => (
              <PaymentMethod
                key={i}
                method={pw}
                selectedPaymentMethod={selectedPaymentMethod!}
                onClick={() => setSelectedPaymentMethod(pw)}
              />
            ))}
          </div>
        </section>
      </div>
      <div className="sticky bottom-0 left-0 bg-gray-50 py-2 border-t">
        <h4 className="text-base font-semibold ">Withdraw : </h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleWithdraw)}>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute top-[10px] left-2 text-gray-500">
                    Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`${selectedPaymentMethod?.min_withdrawals} ~ ${selectedPaymentMethod?.max_withdrawals}`}
                      disabled={isLoading}
                      className="w-full pl-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="walletNumber"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute top-[10px] left-2 text-gray-500">
                    Account
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Account Number`}
                      disabled={isLoading}
                      className="w-full pl-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute top-[10px] left-2 text-gray-500">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={`*****`}
                      disabled={isLoading}
                      className="w-full pl-20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              disabled={isLoading}
              className="text-white disabled:cursor-not-allowed disabled:bg-blue-800 bg-blue-600 hover:bg-blue-700 hover:transition-colors px-4 py-2 cursor-pointer rounded-sm shadow-sm w-full mt-8"
            >
              {isLoading ? "Withdrawing..." : "Withdraw"}
            </button>
          </form>
        </Form>

        {withdraw && (
          <InvoiceModal
            onClose={() => setWithdraw(undefined)}
            modalOpne={!!withdraw}
            withdraw={withdraw}
          />
        )}
      </div>
    </>
  );
};

export default WithdrawForm;
