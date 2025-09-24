import React from "react";
import TabNav from "./TabNav";

interface TabLayoutProps {
  children: React.ReactNode;
}
const TabLayout = ({ children }: TabLayoutProps) => {
  return (
    <main>
      {children}

      <TabNav />
    </main>
  );
};

export default TabLayout;
