import React from "react";
import AppNotice from "./AppNotice";
import AppMenuItems from "./AppMenuItems";
import SlotGames from "./SlotsGames";
import WithdrawDepositButton from "./WithdrawDepositButton";
import LiveCasino from "./LiveCasino";
import Sports from "./Sports";
import HeroSliderWrapper from "./HeroSliderWrapper";

const HomeApp = () => {
  return (
    <div className="app p-3">
      <AppNotice />
      <HeroSliderWrapper />
      <WithdrawDepositButton />
      <AppMenuItems />
      {/* <HotGames /> */}
      <SlotGames />
      {/* <ESports /> */}
      <Sports />
      <LiveCasino />
    </div>
  );
};

export default HomeApp;
