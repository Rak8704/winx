"use client";
import Image from "next/image";
import React, { useState } from "react";

import announcement from "@/../public/announcement-poster.png";
import close_btn from "@/../public/icons/close.svg";

import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

const AnnouncementModal: React.FC = () => {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="flex fixed backdrop-blur-sm top-0 left-0 z-[1001] justify-center items-center w-full h-screen">
      <div className="w-[80%] mx-auto">
        <div className="announcement-bg w-full h-[90px]"></div>

        <div className="bg-[#00333A]/90 p-2 border-2 border-[#00333A] rounded-b-md ">
          <div className="">
            <Image
              src={announcement}
              alt="announcement"
              className="w-full h-[360px]"
            />
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              style={{
                paddingLeft: 18.68,
                paddingRight: 18.68,
                paddingTop: 7.76,
                paddingBottom: 7.76,

                background:
                  "linear-gradient(180deg, var(--color-yellow-50, #FFE600) 0%, var(--color-orange-50, #FFB800) 100%)",
                boxShadow: "0px 2.0799999237060547px 0px #B64100",
                overflow: "hidden",
                borderRadius: 21.84,
                outline:
                  "1px var(--color-yellow-83-50%, rgba(255, 242, 166, 0.50)) solid",
                outlineOffset: "-1px",

                gap: 5.28,
              }}
              className="flex flex-1 items-center justify-center"
            >
              <BiSolidLeftArrow className="text-[#B64100] w-5 h-5 " />
              <span
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--color-orange-36, #B64100)",
                  fontSize: 15.6,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                  wordWrap: "break-word",
                  textShadow: "0px 2px 0px rgba(159, 52, 0, 0.20)",
                }}
              >
                Previous
              </span>
            </button>

            <button
              style={{
                paddingLeft: 18.68,
                paddingRight: 18.68,
                paddingTop: 7.76,
                paddingBottom: 7.76,
                background:
                  "linear-gradient(180deg, var(--color-yellow-50, #FFE600) 0%, var(--color-orange-50, #FFB800) 100%)",
                boxShadow: "0px 2.0799999237060547px 0px #B64100",
                overflow: "hidden",
                borderRadius: 21.84,
                outline:
                  "1px var(--color-yellow-83-50%, rgba(255, 242, 166, 0.50)) solid",
                outlineOffset: "-1px",

                gap: 5.28,
              }}
              className="flex flex-1 items-center justify-center"
            >
              <span
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--color-orange-36, #B64100)",
                  fontSize: 15.6,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                  wordWrap: "break-word",
                  textShadow: "0px 2px 0px rgba(159, 52, 0, 0.20)",
                }}
              >
                Next
              </span>
              <BiSolidRightArrow className="text-[#B64100] w-5 h-5 " />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setOpen(false)}
        className="absolute top-7 right-3 cursor-pointer"
      >
        <Image
          src={close_btn}
          alt="close button"
          className="w-[30px] aspect-square"
        />
      </button>
    </div>
  );
};

export default AnnouncementModal;
