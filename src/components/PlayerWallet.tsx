"use client";
import { useState } from "react";

export default function PlayerWallet({ playerId }: { playerId: string }) {
  const [amount, setAmount] = useState(0);

  async function handleDeposit() {
    try {
      const res = await fetch("/api/gamexa/players/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, amount }),
      });
      
      // Check if response is ok before parsing JSON
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Deposit failed:", errorText);
        throw new Error(`Deposit failed with status ${res.status}: ${errorText}`);
      }
      
      const text = await res.text();
      if (!text) {
        throw new Error("Empty response from server");
      }
      
      const data = JSON.parse(text);
      console.log("Deposit:", data);
    } catch (error) {
      console.error("Error during deposit:", error);
      // Handle error appropriately (e.g., show user notification)
    }
  }

  async function handleWithdraw() {
    try {
      const res = await fetch("/api/gamexa/players/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, amount }),
      });
      
      // Check if response is ok before parsing JSON
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Withdraw failed:", errorText);
        throw new Error(`Withdraw failed with status ${res.status}: ${errorText}`);
      }
      
      const text = await res.text();
      if (!text) {
        throw new Error("Empty response from server");
      }
      
      const data = JSON.parse(text);
      console.log("Withdraw:", data);
    } catch (error) {
      console.error("Error during withdraw:", error);
      // Handle error appropriately (e.g., show user notification)
    }
  }

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}
