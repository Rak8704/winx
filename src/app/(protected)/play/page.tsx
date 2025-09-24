// app/(game)/play/page.tsx (or wherever your Play component is)

"use client";

import SecondaryButton from "@/components/buttons/SecondaryButton";
import GameOpeningLoader from "@/components/loader/GameOpeningLoader";
import useGetCurrentUser from "@/hook/useCurrentUser";
import { createPlayer, launchGameFromAnyAPI } from "@/lib/features/gameService";
import { useOpenGameMutation } from "@/lib/features/gamesApiSlice";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Play = () => {
  const [openGame] = useOpenGameMutation();
  const [isIframeLoading, setIsLoading] = useState(true);
  const [iframe, setIframe] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Game is not available");

  const router = useRouter();
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId") || "";

  const user = useGetCurrentUser();

  // ---------------- Get or create GameXA player ----------------
  const getPlayerId = async (user: any) => {
    if (!user) return null;

    if (user.gameXAPlayerId) return user.gameXAPlayerId;

    try {
      const playerData = {
        username: user.phone || `user_${Date.now()}`,
        email: user.email || `${user.phone}@winxebet.com`,
        full_name: user.name || `Guest ${Date.now()}`,
        phone: user.phone || "",
        password: "StrongPassword123!",
        currency: "IDR",
        language: "en",
      };

      console.log("Creating GameXA player with data:", playerData);
      const player = await createPlayer(playerData);
      const playerId =
        player.player_id?.toString() ||
        player.player?.id?.toString() ||
        player.id?.toString();

      if (!playerId) throw new Error("Failed to get GameXA player ID");

      console.log("Created GameXA player ID:", playerId);

      // Optional: update user session / DB with playerId
      return playerId;
    } catch (err) {
      console.error("GameXA player creation error:", err);
      throw err;
    }
  };

  useEffect(() => {
    console.log("Play component - user:", user);
    
    if (!user) {
      setError(true);
      setErrorMessage("Please log in to play games");
      const timer = setTimeout(() => router.push("/login"), 2000);
      return () => clearTimeout(timer);
    }

    if (!user.phone && !user.id) {
      setError(true);
      setErrorMessage("User session is invalid. Please log in again.");
      const timer = setTimeout(() => router.push("/login"), 2000);
      return () => clearTimeout(timer);
    }

    if (!gameId || gameId.trim() === "") {
      setError(true);
      setErrorMessage("Invalid game selection");
      return;
    }

    const launch = async () => {
      try {
        const playerId = await getPlayerId(user);
        if (!playerId) throw new Error("Missing GameXA player ID");

        setIsLoading(true);

        const res = await launchGameFromAnyAPI(gameId, playerId, openGame);

        let url = "";
        let iframeMode = "1";

        if (res?.content?.game?.url) {
          url = res.content.game.url;
          iframeMode = res.content.game.iframe || "1";
        } else if (res?.game_launch_url) {
          url = res.game_launch_url;
        } else {
          throw new Error("Invalid game launch response");
        }

        if (iframeMode === "0") {
          window.location.href = url;
        } else {
          setIframe(url);
        }
      } catch (err: unknown) {
        console.error("Game launch error:", err);
        setError(true);
        setErrorMessage("Failed to launch game. " + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    launch();
  }, [gameId, user, openGame, router]);

  return (
    <div className="w-full h-screen">
      {isIframeLoading && !error && <GameOpeningLoader />}

      {!isIframeLoading && !error && iframe && (
        <iframe
          src={iframe}
          className="w-full h-full border-0 rounded-b-lg"
          onLoad={() => setIsLoading(false)}
          allowFullScreen
        />
      )}

      {error && (
        <div className="w-full h-screen bg-[#006165] flex justify-center items-center">
          <div className="w-[280px] md:w-[320px] lg:w-[350px] bg-white overflow-hidden rounded-xl">
            <div className="h-[70%] w-full bg-red-500 px-8 py-2">
              <h3 className="text-2xl font-semibold text-white">Error</h3>
              <p className="text-sm text-white tracking-wide">{errorMessage}</p>
            </div>
            <div className="flex justify-end items-end pb-4 pr-4">
              <Link href="/" className="mt-4">
                <SecondaryButton>Go Home</SecondaryButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;
