/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { RiMenuFoldLine } from "react-icons/ri";

import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { findCurrentUser } from "@/data/user";
import HeaderBalance from "./HeaderBalance";
import AppSideCanva from "./AppSideCanva";

const Header = async () => {
  const user: any = await findCurrentUser();
  return (
    <header
      className="flex items-center justify-between px-3 py-2"
      style={{
        width: "100%",
        height: 70,

        zIndex: 1000,
        position: "sticky",
        top: 0,
        background: "var(--color-cyan-21, #000000)",
      }}
    >
      <div className="flex items-center  gap-2">
        <div
          data-variant="21"
          style={{
            width: 26,
            height: 26,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,

              overflow: "hidden",
            }}
          >
            <AppSideCanva
              trigger={
                <RiMenuFoldLine className="w-6 h-5 cursor-pointer text-white " />
              }
            />
          </div>
        </div>
        <Image
          style={{
            width: 89.98,
            height: 28.08,
          }}
          src={logo}
          alt="logo"
        />
      </div>

      {user && user.wallet && (
        <HeaderBalance
          balance={+user.wallet.balance}
          currency={user.wallet.currency}
        />
      )}
      {!user && (
        <div className="flex items-center  gap-2">
          <Link
            href={"/login"}
            style={{
              height: 28.08,
              minWidth: 70.72,
              paddingLeft: 18.39,
              paddingRight: 18.39,
              paddingTop: 1,
              paddingBottom: 1,

              background:
                "linear-gradient(180deg, var(--color-cyan-27, #0F727C) 0%, var(--color-cyan-17, #004E56) 100%)",
              boxShadow: "0px 1.0399999618530273px 0px #003941",
              borderRadius: 6.24,
              outline:
                "1px var(--color-cyan-30-50%, rgba(17, 134, 125, 0.50)) solid",
              outlineOffset: "-1px",
              justifyContent: "center",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                color: "var(--color-orange-64, #FFAB49)",
                fontSize: 12.5,
                fontFamily: "Segoe UI",
                fontWeight: "700",
                lineHeight: 14.35,
                wordWrap: "break-word",
                textShadow: "0px 1px 0px rgba(17, 0, 0, 0.30)",
              }}
            >
              Login
            </div>
          </Link>
          <Link
            href={"/register"}
            style={{
              height: 28.08,
              minWidth: 70.72,
              paddingTop: 1,
              paddingBottom: 1,
              paddingLeft: 10.4,
              paddingRight: 10.41,

              background:
                "linear-gradient(180deg, var(--color-yellow-50, #FFE600) 0%, var(--color-orange-50, #FFB800) 100%)",
              boxShadow: "0px 1.0399999618530273px 0px #B64100",
              overflow: "hidden",
              borderRadius: 6.24,
              outline:
                "1px var(--color-yellow-83-50%, rgba(255, 242, 166, 0.50)) solid",
              outlineOffset: "-1px",
              justifyContent: "center",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                color: "var(--color-orange-36, #B64100)",
                fontSize: 12.5,
                fontFamily: "Segoe UI",
                fontWeight: "700",
                lineHeight: 14.35,
                wordWrap: "break-word",
                textShadow: "0px 1px 0px rgba(159, 52, 0, 0.20)",
              }}
            >
              Register
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
