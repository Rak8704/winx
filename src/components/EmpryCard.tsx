"use client";
import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";

const EmpryCard = ({ plusRedirect }: { plusRedirect: string }) => {
  return (
    <div className="empty-card-bg relative">
      <div className="flex items-center gap-3 absolute text-base bottom-3 left-1/2 -translate-x-1/2">
        <span className=" text-gray-400 font-semibold">Empty E-Wallet</span>
        <Link href={plusRedirect} className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
          <FiPlus className="w-4 h-4  text-white " />
        </Link>
      </div>
    </div>
  );
};

export default EmpryCard;
