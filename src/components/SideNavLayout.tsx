import React from "react";
import SideNav from "./SideNav";

const SideNavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start">
      <div className="hidden md:block md:w-[30%] lg:w-[20%] h-screen max-h-screen relative">
        <div className="fixed top-0 left-0 md:w-[30%] lg:w-[20%]">
          <SideNav />
        </div>
      </div>
      <div className="w-full md:w-[70%] lg:w-[80%]">{children}</div>
    </div>
  );
};

export default SideNavLayout;
