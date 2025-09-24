"use client";

import React, { useState } from "react";
import PlayerWallet from "@/components/PlayerWallet";

// ============================
// Game Launch Function
// ============================
async function launchGame(playerId: string, gameUid: string) {
  try {
    const res = await fetch("/api/gamexa/games/launch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player_id: playerId, game_uid: gameUid }),
    });
    
    // Check if response is ok before parsing JSON
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Launch game failed:", errorText);
      throw new Error(`Launch game failed with status ${res.status}: ${errorText}`);
    }
    
    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from server");
    }
    
    const data = JSON.parse(text);
    console.log("Launch Game Response:", data);
    return data;
  } catch (error) {
    console.error("Error during game launch:", error);
    throw error;
  }
}

// ============================
// Player Create Function
// ============================
async function createPlayer(playerData: any) {
  try {
    const res = await fetch("/api/gamexa/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(playerData),
    });
    
    // Check if response is ok before parsing JSON
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Create player failed:", errorText);
      throw new Error(`Create player failed with status ${res.status}: ${errorText}`);
    }
    
    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from server");
    }
    
    const data = JSON.parse(text);
    console.log("Create Player Response:", data);
    return data;
  } catch (error) {
    console.error("Error during player creation:", error);
    throw error;
  }
}

// ============================
// Page Component
// ============================
export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: playerId } = await params;

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Launch Game
  const handleLaunchGame = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await launchGame(playerId, "GAME_UID_HERE"); // replace with actual game UID
      if (data && !data.success) setError(data.error || "Unknown error");
      else if (data.lobby_url) window.open(data.lobby_url, "_blank");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create Player
  const handleCreatePlayer = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await createPlayer({
        username,
        email,
        password,
        full_name: fullName,
        phone,
        currency: "BDT",
      });

      if (data && !data.success) setError(data.error || "Unknown error");
      else alert("Player created with ID: " + data.player_id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Player: {playerId}</h1>

      {/* Player Wallet Section */}
      <PlayerWallet playerId={playerId} />

      {/* Create Player Form */}
      <h2>Create Player</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreatePlayer} disabled={loading}>
        {loading ? "Creating..." : "Create Player"}
      </button>

      {/* Game Launch Button */}
      <button
        onClick={handleLaunchGame}
        disabled={loading}
        style={{ paddingBlockStart: "10px", paddingInlineEnd: "20px", paddingBlockEnd: "10px", paddingInlineStart: "20px", marginBlockStart: "20px" }}
      >
        {loading ? "Launching..." : "Launch Game"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
