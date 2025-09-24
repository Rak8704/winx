import React from "react";

const Spiner = ({ className = "" }: { className?: string }) => {
  return <span className={`spiner w-2 h-2 ${className} `}></span>;
};

export default Spiner;
