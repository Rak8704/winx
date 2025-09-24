import React from "react";

const WithdrawInfo = ({
  mainBalance,
  availableBalance,
  remainingWithdrawal,
  turnOver,
}: {
  mainBalance: number;
  availableBalance: number;
  remainingWithdrawal: number;
  turnOver: number;
}) => {
  return (
    <div>
      <div className="mb-10">
        <p className="text-sm text-gray-500 font-semibold">Withdrawal time</p>
        <p className="text-sm text-gray-500 font-semibold">
          Tips：উত্তোলনের সময়সীমা: ২৪ ঘন্টা
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 font-semibold">
          Daily withdrawal : 10 (Times), Remaining withdrawal :{" "}
          {remainingWithdrawal} (Times)
        </p>
      </div>

      <div>
        <p className="text-sm text-black font-semibold">
          Main Wallet : {mainBalance}
        </p>
        <p className="text-sm text-black font-semibold">
          Available Wallet : {availableBalance}
        </p>
      </div>

      {turnOver != 0 && (
        <div className="py-4">
          <div className="flex items-center justify-center ">
            <p className="text-sm text-red-600 font-semibold border-t border-b border-l px-12 py-3">
              Turnover
            </p>
            <p className="text-sm text-emerald-600 font-bold border px-10 py-3">
              {turnOver}
            </p>
          </div>

          <span className="text-xs block text-gray-500 text-center">
            Bet more {turnOver} to get the full balance to withdraw
          </span>
        </div>
      )}
    </div>
  );
};

export default WithdrawInfo;
