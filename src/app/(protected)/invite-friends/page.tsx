import SiteHeader from "@/components/SiteHeader";
import React from "react";
import Invite from "./invite";

const InviteFriends = () => {
  return (
    <div className=" h-screen">
      <SiteHeader title="Invite Friends" />
      <main className="pb-6 space-y-3">
        <Invite />
      </main>
    </div>
  );
};

export default InviteFriends;
