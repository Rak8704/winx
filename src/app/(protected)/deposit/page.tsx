/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useGetCurrentUser from "@/hook/useCurrentUser";
import {
  useGetDepositPaymentDataQuery,
  useMakeDepositeMutation,
} from "@/lib/features/depositApiSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdOutlineSupportAgent, MdHistory } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import PageLoader from "@/components/loader/PageLoader";
import toast from "react-hot-toast";
import SiteHeader from "@/components/SiteHeader";
import PaymentMethod from "@/components/PaymentMethod";

type BonusOption = {
  id: string;
  label: string;
  value: number;
  disable: boolean;
};

const DepositPage: React.FC = () => {
  const { data, isLoading } = useGetDepositPaymentDataQuery();
  const wallets: any[] = data?.wallets || [];
  const bonus = data?.bonus;

  const user: any = useGetCurrentUser();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>();
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [walletNumber, setWalletNumber] = useState("");
  const [selectedBonus, setSelectedBonus] = useState<BonusOption>({
    id: "none",
    label: "No Bonus",
    value: 0,
    disable: false,
  });
  const [selectedAmountButton, setSelectedAmountButton] = useState<number | null>();
  const quickAmounts = [400, 500, 800, 1000, 1500, 2000, 5000, 10000, 25000];
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [bonusOptions, setBonusOptions] = useState<BonusOption[]>([
    { id: "signinBonus", label: "First Deposit Bonus", value: 0, disable: true },
    { id: "referralBonus", label: "Refer Bonus", value: 0, disable: true },
    { id: "none", label: "No Bonus", value: 0, disable: false },
  ]);

  const [makeDeposit] = useMakeDepositeMutation();

  // --- Handlers ---
  const handleAmountButtonClick = (amount: number) => {
    setSelectedAmountButton(amount);
    setDepositAmount(amount.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepositAmount(e.target.value);
    setSelectedAmountButton(null);
  };

  const handleWalletNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletNumber(e.target.value);
  };

  const calculateBonus = (amount: number) => {
    return selectedBonus ? Math.round((amount * selectedBonus.value) / 100) : 0;
  };

  const handleSubmit = () => {
    setPending(true);
    const amount = parseFloat(depositAmount);
    const bonusAmount = calculateBonus(amount);

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      setPending(false);
      return;
    }

    if (amount < selectedPaymentMethod.min_deposit) {
      setError(`Minimum deposit is ${selectedPaymentMethod.min_deposit}`);
      setPending(false);
      return;
    }

    if (amount > selectedPaymentMethod.max_deposit) {
      setError(`Maximum deposit is ${selectedPaymentMethod.max_deposit}`);
      setPending(false);
      return;
    }

    if (!walletNumber) {
      setError("Please enter your wallet number");
      setPending(false);
      return;
    }

    // Call Deposit API
    makeDeposit({
      amount: amount + bonusAmount,
      ps: selectedPaymentMethod.name,
    })
      .unwrap()
      .then((res) => {
        if (res && res.success && res.payload?.payment_url) {
          setPending(false);
          setRedirecting(true);
          toast.success("Redirecting to E-Wallet Payment Gateway...");
          setTimeout(() => {
            window.location.href = res.payload.payment_url;
          }, 1000);
        } else {
          toast.error("Failed to initiate deposit. Please try again.");
          setPending(false);
        }
      })
      .catch((err: any) => {
        toast.error(err?.data?.error || err?.data?.message || "Deposit failed");
        setPending(false);
      });
  };

  const totalAmount = parseFloat(depositAmount) || 0;
  const bonusAmount = calculateBonus(totalAmount);
  const grandTotal = totalAmount + bonusAmount;
  const isValidAmount = totalAmount >= 100 && totalAmount <= 50000;

  // --- Effects ---
  useEffect(() => {
    if (wallets.length) setSelectedPaymentMethod(wallets[0]);
  }, [wallets]);

  useEffect(() => {
    if (bonus && user) {
      setBonusOptions((prev) =>
        prev.map((b) => {
          if (b.id === "signinBonus") return { ...b, value: bonus.signinBonus, disable: !(bonus.signinBonus > 0) };
          if (b.id === "referralBonus") return { ...b, value: bonus.referralBonus, disable: !(bonus.referralBonus > 0) };
          return b;
        })
      );
    }
  }, [bonus, user]);

  useEffect(() => {
    if (quickAmounts.includes(+depositAmount)) setSelectedAmountButton(+depositAmount);
  }, [depositAmount]);

  useEffect(() => {
    if (error) setError("");
  }, [depositAmount]);

  return (
    <>
      {data && !isLoading && user ? (
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <SiteHeader title="Deposit">
            <Link href="/support" className="text-gray-700 hover:text-gray-900">
              <MdOutlineSupportAgent className="text-lg" />
            </Link>
            <Link href="/history" className="text-gray-700 hover:text-gray-900">
              <MdHistory className="text-lg" />
            </Link>
          </SiteHeader>

          <main className="w-full px-4 py-6 space-y-6">
            {/* Payment Methods */}
            <section className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h2>
              <div className="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar">
                {wallets.map((wallet, i) => (
                  <PaymentMethod
                    key={i}
                    method={wallet}
                    selectedPaymentMethod={selectedPaymentMethod}
                    onClick={() => setSelectedPaymentMethod(wallet)}
                  />
                ))}
              </div>
            </section>

            {/* Amount Input */}
            <section className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Deposit Amount</h2>
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">BDT</span>
                </div>
                <input
                  disabled={pending}
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="Deposit amount"
                  value={depositAmount}
                  onChange={handleAmountChange}
                />
              </div>

              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">+88</span>
                </div>
                <input
                  disabled={pending}
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                  placeholder="Wallet Number"
                  value={walletNumber}
                  onChange={handleWalletNumberChange}
                />
              </div>

              {error && <span className="text-sm text-red-700">{error}</span>}

              <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    disabled={pending}
                    onClick={() => handleAmountButtonClick(amount)}
                    className={`py-1 px-3 border rounded-lg text-center whitespace-nowrap ${
                      selectedAmountButton === amount
                        ? "bg-blue-50 border-blue-500 text-blue-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {amount} BDT
                    {selectedBonus.value > 0 && (
                      <div className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs font-medium rounded-full px-1">
                        +{Math.round((amount * selectedBonus.value) / 100)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Bonus Selection */}
            <section className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Select Bonus</h2>
              <div className="space-y-3">
                {bonusOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`flex items-start p-3 border rounded-lg cursor-pointer ${
                      option.disable
                        ? "opacity-50 cursor-not-allowed"
                        : selectedBonus.id === option.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => !option.disable && !pending && setSelectedBonus(option)}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedBonus.id === option.id ? "border-blue-500" : "border-gray-400"
                        }`}
                      >
                        {selectedBonus.id === option.id && (
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-gray-800">{option.label}</div>
                      <div className="text-sm text-gray-600">
                        {option.id === "signinBonus" && `Get ${option.value}% extra on first deposit`}
                        {option.id === "referralBonus" && `${option.value}% Bonus from referral`}
                        {option.id === "none" && `Proceed without any bonus`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Summary */}
            <section className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Deposit Amount:</span>
                  <span className="font-medium">{totalAmount.toLocaleString()} BDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bonus Amount:</span>
                  <span className="font-medium text-green-600">
                    +{bonusAmount.toLocaleString()} BDT
                  </span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="text-gray-800 font-medium">Total:</span>
                  <span className="font-bold text-lg">{grandTotal.toLocaleString()} BDT</span>
                </div>
              </div>
            </section>

            {/* Action Button */}
            <button
              className={`w-full py-4 px-6 rounded-lg font-medium text-white text-lg shadow-sm ${
                isValidAmount && !redirecting ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isValidAmount || pending || redirecting}
              onClick={handleSubmit}
            >
              {redirecting ? (
                <div className="flex items-center justify-center">
                  <PulseLoader size={12} color="#fff" />
                  <span className="ml-2">Redirecting to Payment Gateway...</span>
                </div>
              ) : pending ? (
                <div className="flex items-center justify-center">
                  <PulseLoader size={12} color="#fff" />
                  <span className="ml-2">Processing...</span>
                </div>
              ) : (
                "Continue to E-Wallet Payment"
              )}
            </button>
          </main>
        </div>
      ) : (
        <PageLoader />
      )}
    </>
  );
};

export default DepositPage;
