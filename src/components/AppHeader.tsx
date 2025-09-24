"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const AppHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="flex sticky z-[100] top-0 w-full p-3 items-center justify-between bg-gradient-to-br from-[#134e4a] to-[#1e6f64]">
      <button onClick={() => router.back()} className="w-max">
        <IoIosArrowBack className="w-6 h-6 text-[#ffb800]" />
      </button>

      <div className="flex-1 ">
        <h3 className="text-center w-full   !text-yellow-300 text-[length:var(--www-wwwck444-com-inter-bold-font-size)] tracking-[var(--www-wwwck444-com-inter-bold-letter-spacing)] leading-[var(--www-wwwck444-com-inter-bold-line-height)] whitespace-nowrap [font-style:var(--www-wwwck444-com-inter-bold-font-style)] text-lg font-bold">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default AppHeader;
