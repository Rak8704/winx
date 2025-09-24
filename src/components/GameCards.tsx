/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="react" />
/// <reference types="react-dom" />
"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NetEnt, Title } from "@/types/game";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LiaHeartSolid } from "react-icons/lia";
import { Loader } from "./loader/GameLoader";
import { providers } from "../../data/api-providers";
import { useOpenGameMutation } from "@/lib/features/gamesApiSlice";
import Link from "next/link";
import useGetCurrentUser from "@/hook/useCurrentUser";
import { launchGameFromAnyAPI } from "@/lib/features/gameService";
import { getProviderDisplayName } from "@/lib/utils/providerUtils";
import { LocalArrayStorage } from "@/lib/favorites";

const storage = LocalArrayStorage<string>();

interface GameCardWithProviderProps {
  game: NetEnt;
}

export const GameCardWithProvider = ({ game }: GameCardWithProviderProps) => {
  const [imageLoaded, setImageLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFav, setFav] = useState(false);
  const [iframe, setIframe] = useState("");
  const { img, name, title, id } = game;
  const user: any = useGetCurrentUser();

  const [openGame, { isLoading }] = useOpenGameMutation();

  const handleImageLoad = () => {
    setImageLoad(true);
  };

  const findProviderImage = (providerName: Title | string) => {
    const provider = providers.find(
      (provider) => provider.name === providerName
    );
    return provider?.imageWhite || null; // ❌ no default EVO-WHITE
  };

  const providerImag = findProviderImage(title);
  const providerDisplayName = getProviderDisplayName(title);

  const handleOpenGame = async (gameId: string) => {
    if (!user) {
      alert("Please log in to play games");
      window.location.href = "/login";
      return;
    }

    if (!user.phone) {
      alert("Session error. Please log in again.");
      window.location.href = "/login";
      return;
    }

    // Always fetch the latest user data from DB to ensure we have the correct player ID
    let playerId = user.gameXAPlayerId || user.playerId;
    try {
      const response = await fetch("/api/user");
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          playerId = data.user.gameXAPlayerId || data.user.playerId || playerId;
        }
      }
    } catch (error) {
      console.error("Error fetching user data from API:", error);
    }
    
    launchGameFromAnyAPI(gameId, playerId, openGame)
      .then((res) => {
        if (res) {
          const url = res.content.game.url;
          const iframeMode = res.content.game.iframe;
          if (iframeMode === "0") {
            location.href = url;
          } else {
            setIframe(url);
            setShowModal(true);
          }
        }
      })
      .catch((error) => {
        console.error("Game launch error:", error);
        const errorMessage = error.message || "Error launching game. Please try again.";
        alert(errorMessage);
      });
  };

  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<any>(null);

  useEffect(() => {
    if (!img || img === "NULL" || img.trim() === "") {
      setImageSrc("/games/provider/default-game.png");
      setLoaded(true);
      return;
    }

    const imgC = new window.Image();
    imgC.src = img;
    imgC.onload = () => {
      setImageSrc(img);
      setLoaded(true);
    };
    imgC.onerror = () => {
      setImageSrc("/games/provider/default-game.png");
      setLoaded(true);
    };
  }, [img]);

  const handleAddToFav = (gameId: string) => {
    setFav(!isFav);
    storage.push("favorites-games", gameId);
  };

  useEffect(() => {
    setFav(storage.exists("favorites-games", id));
  }, [storage, id]);

  return (
    <>
      {loaded && imageSrc ? (
        <div className="relative">
          <Link
            href={`/play?gameId=${id}`}
            className="relative game-main overflow-hidden"
          >
            <div
              className={`relative overflow-hidden rounded-2xl ${
                imageLoaded ? "visible " : "invisible h-0"
              }`}
            >
              <div className="shiny-card w-full">
                <img
                  alt={name || "Game image"}
                  src={imageSrc}
                  className="w-full h-40 object-cover rounded-2xl"
                  onLoad={handleImageLoad}
                  onError={() => setImageSrc("/games/provider/default-game.png")}
                />
              </div>

              {providerImag && (
                <div className="absolute z-10 left-0 bottom-0 flex justify-center items-center game-card-provider-overllay rounded-2xl">
                  <Image
                    src={providerImag}
                    alt={providerDisplayName}
                    width={35}
                    height={15}
                    unoptimized
                    className="w-[35px] h-auto"
                    title={providerDisplayName}
                  />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
              <h3 className="text-white text-xs truncate">{name}</h3>
              <span className="text-white/70 text-[10px] font-medium">
                {providerDisplayName}
              </span>
            </div>
          </Link>
          <div className="absolute top-2 right-2 z-10 ">
            <button
              onClick={() => handleAddToFav(id)}
              className="w-[18px] h-[18px] rounded-full bg-white/10 flex justify-center items-center "
            >
              <span
                className={`w-[15px] h-[15px] ${
                  isFav ? "text-pink-500" : "text-white"
                }`}
              >
                <LiaHeartSolid className="w-full h-full" />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
