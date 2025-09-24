/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import gift_box from "@/../public/icons/rewards/gift-box.png";
import Image from "next/image";
import { FaQuestionCircle } from "react-icons/fa";
import SigninBonusModal from "./signinbonus-modal";

interface SigninBonusPlanProps {
  nextClaimAvailable: any;
}
const SigninBonusPlan = ({ nextClaimAvailable }: SigninBonusPlanProps) => {
  return (
    <div className="my-4 mt-16 bg-white">
      <div className="border-b border-b-blue-600">
        <h4 className="text-xl py-2 text-blue-600 text-center w-max mx-auto border-b-2 border-b-[#f8313b]">
          নতুন সদস্য বৃদ্ধির পরিকল্পনা
        </h4>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2">
          <Image src={gift_box} alt="gift box" className="w-[55px] h-auto" />
          <div>
            <h4 className="text-xl  text-[#FE3B44] text-center ">
              নতুন সদস্য বৃদ্ধির পরিকল্পনা
            </h4>
            <div className="flex items-center gap-2 text-[#8E0019]">
              <span className=" text-sm font-medium ">
                Not Checked in today
              </span>
              <SigninBonusModal prize={nextClaimAvailable.prize}>
                <FaQuestionCircle className="w-4 h-4" />
              </SigninBonusModal>
            </div>
          </div>
        </div>

        <div className="bg-[#FBF4ED]  rounded-2xl my-8 p-4">
          <span className="text-base text-gray-500 font-medium block">
            Minimum Deposti{" "}
          </span>
          <span className="text-base text-gray-500 font-medium block">
            Amount :
          </span>
          <span className="text-base text-[#8E0019] font-semibold block">
            ৳ {nextClaimAvailable.deposit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SigninBonusPlan;
