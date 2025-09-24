import React from "react";

const PageLoader = () => {
  return (
    <div className="w-full !h-screen flex justify-center items-center app">
      <div className="flex flex-col items-center">
        <div className="loader"></div>
        <span className="text-sm font-bold md:font-semibold text-[rgb(255,230,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
