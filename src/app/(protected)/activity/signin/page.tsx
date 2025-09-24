import SiteHeader from "@/components/SiteHeader";
import React from "react";
import SigninBonus from "./bonus";

const Signin = () => {
  return (
    <div className="h-screen bg-gray-50">
      <SiteHeader title="Signin" />
      <main className="pb-6 space-y-3">
        <SigninBonus />
      </main>
    </div>
  );
};

export default Signin;
