"use client";
import React from "react";
import { TfiHome } from "react-icons/tfi";
import { TbGiftCard } from "react-icons/tb";
import Link from "next/link";
import { BiAward } from "react-icons/bi";
import { GiCutDiamond } from "react-icons/gi";
import { usePathname } from "next/navigation";
import { IoGameController } from "react-icons/io5";

const TabNav = () => {
  const path = usePathname();

  return (
    <div className="fixed bottom-[50px] left-0 w-full md:w-[500px] md:mx-auto md:left-1/2 md:-translate-x-1/2 z-[999]">
      <div
        style={{
          width: "100%",
          height: 52,
          paddingLeft: 5.2,
          paddingRight: 5.2,
          left: 0,
          top: 0,
          position: "absolute",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "inline-flex",
        }}
      >
        <div
          className="flex items-center justify-between py-1 px-2"
          style={{
            alignSelf: "stretch",
            height: 46.8,
            position: "relative",
            background:
              "linear-gradient(180deg, var(--color-cyan-18, #005A5A) 0%, var(--color-cyan-12, #003E3E) 50%, var(--color-cyan-9, #002C2C) 100%)",
            boxShadow:
              "0px -3.119999885559082px 10.399999618530273px rgba(8, 186, 183, 0.40)",
            borderRadius: 36.4,
            borderTop: "1px var(--color-cyan-53, #26E7E4) solid",
          }}
        >
          <div className="flex-1">
            <Link
              href="/"
              className={`flex flex-col items-center justify-center  w-full ${
                path === "/" ? "text-[#FFBC00]" : "text-[#23FFC8]"
              }`}
            >
              <TfiHome style={{ width: 23, height: 23 }} className="mx-auto" />
              <p
                style={{
                  fontSize: 11.04,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                }}
              >
                Home
              </p>
            </Link>
          </div>
          <div className="flex-1">
            <Link
              href="/slots"
              className={`flex flex-col items-center justify-center  w-full ${
                path === "/promotion" ? "text-[#FFBC00]" : "text-[#23FFC8]"
              }`}
            >
              <IoGameController
                style={{ width: 23, height: 23 }}
                className="mx-auto"
              />
              <p
                style={{
                  fontSize: 11.04,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                }}
              >
                Games
              </p>
            </Link>
          </div>
          {/* middle */}
          <div className="flex-1">
            <Link
              href="/invite-friends"
              className="flex flex-col items-center justify-start text-[#23FFC8] w-full"
            >
              <div
                className=" bg-[#23FFC8] flex rounded-full relative left-0 top-0 items-center justify-center"
                style={{ width: 35, height: 35 }}
              >
                <TbGiftCard
                  style={{ width: 27, height: 27 }}
                  className="mx-auto !text-slate-950  "
                />
              </div>
              <p
                style={{
                  fontSize: 11.04,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                }}
              >
                Invite
              </p>
            </Link>
          </div>
          <div className="flex-1">
            <Link
              href="/rewardCenter"
              className={`flex flex-col items-center justify-center  w-full ${
                path === "/reward" ? "text-[#FFBC00]" : "text-[#23FFC8]"
              }`}
            >
              <BiAward style={{ width: 23, height: 23 }} className="mx-auto" />

              <p
                style={{
                  fontSize: 11.04,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                }}
              >
                Reward
              </p>
            </Link>
          </div>
          <div className="flex-1">
            <Link
              href="/member"
              className={`flex flex-col items-center justify-center  w-full ${
                path === "/member" ? "text-[#FFBC00]" : "text-[#23FFC8]"
              }`}
            >
              <GiCutDiamond
                style={{ width: 23, height: 23 }}
                className="mx-auto"
              />
              <p
                style={{
                  fontSize: 11.04,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                }}
              >
                Member
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNav;
