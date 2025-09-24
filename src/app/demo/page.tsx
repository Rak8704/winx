"use client";
import React from "react";

const page = () => {
  const handleDeposit = async () => {
    const response = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "cmc017py00000un84afcgykrw",
        title: "Deposit Received",
        description: "Your deposit of $100 is being processed",
        icon: "MONEY",
      }),
    });

    if (!response.ok) {
      console.error("Failed to send notification");
    }
  };

  return (
    <div>
      <button onClick={() => handleDeposit()}>Button Click</button>
    </div>
  );
};

export default page;
