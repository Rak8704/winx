import React from "react";
import ChatProvider from "../ChatProvider";

const SupportLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ChatProvider />
      {children}
    </div>
  );
};

export default SupportLayout;
