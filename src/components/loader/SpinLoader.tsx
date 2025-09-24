import React from "react";
import { MoonLoader } from "react-spinners";

const SpinLoader = () => {
  return (
    <div className="w-[75px] h-[85px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/50 rounded-lg flex justify-center items-center flex-col gap-1">
      <MoonLoader className="" size={28} color="#fff" />
      <span className="text-white text-sm">Loading...</span>
    </div>
  );
};

export default SpinLoader;
