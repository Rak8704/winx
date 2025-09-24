"use client";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface GameSelectionHeaderProps {
  title: string;
  rightAction: () => void;
  leftAction: () => void;
  isMoreGames?: boolean;
  seeMoreLink?: string;
}
const GameSelectionHeader = ({
  title,
  rightAction,
  leftAction,
  isMoreGames = true,
  seeMoreLink,
}: GameSelectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between my-2">
      <span
        style={{
          color: "var(--color-cyan-57, #23FFC8)",
          fontSize: 18.7,
          fontFamily: "Segoe UI",
          fontWeight: "700",
          textTransform: "uppercase",
          wordWrap: "break-word",
        }}
      >
        {title}
      </span>

      {isMoreGames && (
        <div className="flex gap-1 items-center">
          <button
            style={{
              paddingLeft: 10,
              paddingRight: 19,
              paddingTop: 10,
              paddingBottom: 10,
              background: "var(--color-cyan-13, #003840)",
              boxShadow: "0px 1.0399999618530273px 0px #006165 inset",
              overflow: "hidden",
              borderRadius: 7.8,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5.18,
              display: "inline-flex",
              fontSize: 12.5,
              fontFamily: "Segoe UI",
              fontWeight: "600",
              wordWrap: "break-word",
              textAlign: "center",
              textShadow: "0px 2px 0px rgba(17, 0, 0, 0.30)",
              color: "var(--color-orange-50, #FFB800)",
            }}
          >
            <Link href={`${seeMoreLink}`}>See All</Link>
          </button>
          <button
            onClick={rightAction}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 12,
              paddingBottom: 12,
              background: "var(--color-cyan-13, #003840)",
              boxShadow: "0px 1.0399999618530273px 0px #006165 inset",
              overflow: "hidden",
              borderRadius: 7.8,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5.18,
              display: "inline-flex",
              fontSize: 12.5,
              fontFamily: "Segoe UI",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            <IoIosArrowBack className="text-white" />
          </button>
          <button
            onClick={leftAction}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 12,
              paddingBottom: 12,
              background: "var(--color-cyan-13, #003840)",
              boxShadow: "0px 1.0399999618530273px 0px #006165 inset",
              overflow: "hidden",
              borderRadius: 7.8,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5.18,
              display: "inline-flex",
              fontSize: 12.5,
              fontFamily: "Segoe UI",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            <IoIosArrowForward className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSelectionHeader;
