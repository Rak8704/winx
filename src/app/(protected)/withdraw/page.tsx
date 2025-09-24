import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";
import React from "react";
import { MdHistory, MdOutlineSupportAgent } from "react-icons/md";
import Withdraw from "./withdraw";

const WithdrawPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SiteHeader title="Withdraw">
        <Link
          href="/support"
          className="text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          <MdOutlineSupportAgent className="text-lg" />
        </Link>
        <Link
          href="/history"
          className="text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          <MdHistory className="text-lg" />
        </Link>
      </SiteHeader>
      <main className="w-full px-4 py-6 space-y-5">
        <Withdraw />
      </main>
    </div>
  );
};

export default WithdrawPage;
