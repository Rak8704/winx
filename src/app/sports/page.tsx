"use client";
import AppHeader from "@/components/AppHeader";
import React from "react";
import SideNavLayout from "@/components/SideNavLayout";
import { SportsContainer } from "@/components/sports/SportsContainer";

const Sports = () => {
  return (
    <SideNavLayout>
      <div>
        <AppHeader title="Sports Betting" />
        <main className="bg-[#003e3e] min-h-screen">
          <SportsContainer />
        </main>
      </div>
    </SideNavLayout>
  );
};

export default Sports;
