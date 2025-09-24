import Image from "next/image";
import React from "react";

import notice from "@/../public/icons/notice.png";
import Marquee from "react-fast-marquee";

const AppNotice = () => {
  return (
    <div className="px-1">
      <div
        style={{
          width: "100%",
          height: 32,
          paddingLeft: 11.4,
          paddingRight: 11.4,
          paddingTop: 6.2,
          paddingBottom: 6.2,
          background:
            "linear-gradient(180deg, var(--color-cyan-10, #002632) 0%, var(--color-cyan-11, #003A3A) 100%)",
          boxShadow: "0px 1.7331600189208984px 0px #00333A",
          overflow: "hidden",
          borderRadius: 52,
          outline:
            "1px var(--color-cyan-30-50%, rgba(17, 134, 125, 0.50)) solid",
          outlineOffset: "-1px",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 7.8,
          display: "inline-flex",
        }}
      >
        <Image
          style={{ width: 17.67, height: 17.67, position: "relative" }}
          src={notice}
          alt="notice"
        />
        <div
          style={{
            flex: "1 1 0",
            height: 15.7,
            paddingLeft: 20.8,
            paddingRight: 69.83,
            overflow: "hidden",
            justifyContent: "flex-start",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Marquee>
            <p
              style={{
                flex: "1 1 0",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                color: "var(--color-orange-64, #FFAB49)",
                fontSize: 13,
                fontFamily: "Segoe UI",
                fontWeight: "400",

                textShadow: "0px 2px 0px rgba(17, 0, 0, 0.30)",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              Winxebet 🌟 আপনার প্রথম জমাতে 50% বোনাস পান! 🎉
            </p>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default AppNotice;
