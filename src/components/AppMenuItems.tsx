import Link from "next/link";
import React from "react";

import hotGame from "@/../public/icons/nav-hotgames.svg";
import slot from "@/../public/icons/nav-slot.svg";
import sport from "@/../public/icons/nav-sport.svg";
import live from "@/../public/icons/nav-live.svg";
import fav from "@/../public/icons/nav-fav.svg";
import Image from "next/image";

const menuData = [
  {
    title: "Hot Games",
    icon: hotGame,
    link: "/hot",
  },

  {
    title: "Slots",
    icon: slot,
    link: "/slots",
  },
  {
    title: "Live",
    icon: live,
    link: "/live-casino",
  },

  {
    title: "Sports",
    icon: sport,
    link: "/sports",
  },
  {
    title: "Favorites",
    icon: fav,
    link: "/favorites",
  },
];

const AppMenuItems = () => {
  return (
    <div className="max-w-full w-full overflow-auto scrollbar-none">
      <div className="flex gap-2 items-center flex-nowrap flex-shrink-0 my-4 ">
        {menuData.map((menu, i) => (
          <Link href={menu.link} key={i}>
            <div
              style={{
                height: 41.59,
                minWidth: 124.8,
                paddingLeft: 6.75,
                paddingRight: 6.75,
                background: "var(--color-cyan-13, #003840)",
                boxShadow: "0px 1.0399999618530273px 0px #006165 inset",
                overflow: "hidden",
                borderRadius: 7.8,
                justifyContent: "center",
                alignItems: "center",
                gap: 5.18,
                display: "flex",
              }}
            >
              <div
                data-variant="1"
                style={{ width: 20, height: 20, position: "relative" }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    left: 0,
                    top: 0,
                    position: "absolute",
                    overflow: "hidden",
                  }}
                >
                  <Image src={menu.icon} alt={menu.title} className="w-full " />
                </div>
              </div>
              <span
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--color-grey-94, #E0FFF7)",
                  fontSize: 12.5,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  wordWrap: "break-word",
                }}
              >
                {menu.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AppMenuItems;
