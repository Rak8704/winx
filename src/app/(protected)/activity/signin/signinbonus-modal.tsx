"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import gift from "@/../public/icons/rewards/signin-modal-bg-gift.png";
import money from "@/../public/icons/rewards/money.png";

interface SigninBonusModalProps {
  children: React.ReactNode;
  prize: number;
}
const SigninBonusModal = ({ children, prize }: SigninBonusModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>{children}</button>
      {open && (
        <div className="bg-black/50 z-[1001] w-full h-screen fixed top-0 left-0 right-0 flex justify-center items-center">
          <div className="max-w-[320px] w-[320px] mx-auto relative  ">
            <div className="rounded-3xl overflow-hidden">
              <div className="signin-bonus-modal-header-bg flex items-center pl-5 relative h-[65px]">
                <h4
                  className="text-lg text-white font-bold text-shadow-sm
"
                >
                  Today
                </h4>
                <Image
                  src={gift}
                  className="w-[200px] absolute right-0 bottom-0"
                  alt="gift"
                />
              </div>

              <div className="p-5 bg-white">
                <h4 className="text-gray-700 text-center mb-2 text-lg font-semibold">
                  Reward
                </h4>
                <ul>
                  <li className="flex items-center gap-3 justify-between border-b border-b-gray-200 pb-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src={money}
                        alt="money"
                        className="w-[30px] h-auto"
                      />
                      <span className="text-sm font-semibold font-mono text-gray-700">
                        Bonus
                      </span>
                    </div>
                    <span>৳ {prize}</span>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="absolute -top-20 right-0"
              onClick={() => setOpen(false)}
            >
              <IoIosCloseCircle className="w-8 h-8 text-gray-200" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SigninBonusModal;
