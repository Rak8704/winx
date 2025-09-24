import React from "react";
import { PiHandDepositFill } from "react-icons/pi";

const DepositPageLoader = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="wiggle-glow">
          <PiHandDepositFill size={50} className="" />
        </div>
      </div>
    </>
  );
};

export default DepositPageLoader;
