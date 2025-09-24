import React from "react";

interface BoxProps {
  title: string;
  children: React.ReactNode;
}

const Box = ({ title, children }: BoxProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-slate-700 rounded-lg p-6 w-[400px]">
      <h3 className="py-2 text-center text-white text-2xl font-bold uppercase">{title}</h3>

      <div className="my-3">{children}</div>
    </div>
  );
};

export default Box;
