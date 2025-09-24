"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const SiteHeader = ({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) => {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-10">
      <button
        onClick={() => router.back()}
        className="text-gray-700 hover:text-gray-900 cursor-pointer"
      >
        <FaArrowLeftLong className="text-lg" />
      </button>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <div className="relative flex items-center gap-2">{children}</div>
    </header>
  );
};

export default SiteHeader;
