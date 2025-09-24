/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

import logo_sq from "@/../public/logo-sq.jpg";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full bg-[#000000] pt-4 pb-[100px] px-4">
      <div className="relative w-full md:w-[70%] mx-auto">
        {/* Buttons Row */}
        <div className="flex gap-4 mb-8">
          <Link
            href="#"
            className="flex-1 max-w-[164px] h-[52px] rounded-[14.56px] border border-solid border-[#11867d80] shadow-[0px_2.08px_0px_#003941] [background:linear-gradient(180deg,rgba(15,114,124,1)_0%,rgba(0,78,86,1)_100%)]"
          >
            <div className="relative w-[119px] h-[26px] top-3 left-[23px]">
              <div className="[text-shadow:0px_3.12px_0px_#b64100] text-3xl font-bold text-wwwwwwMbuzz88comselective-yellow absolute w-[119px] h-[26px] top-0 left-0 font-www-wwwMbuzz88-com-segoe-UI-bold-upper  text-[length:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-size)] text-center tracking-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-letter-spacing)] leading-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-line-height)] whitespace-nowrap [font-style:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-style)]">
                PARTNER
              </div>
              <div className="[background:linear-gradient(180deg,rgba(255,184,0,1)_25%,rgba(255,230,0,1)_40%,rgba(255,184,0,1)_54%,rgba(255,230,0,1)_69%,rgba(255,184,0,1)_83%)] [-webkit-background-clip:text] !bg-clip-text text-transparent [-webkit-text-fill-color:transparent] [text-fill-color:transparent]  absolute w-[119px] h-[26px] top-0 left-0 font-www-wwwMbuzz88-com-segoe-UI-bold-upper font-bold text-[length:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-size)] text-center tracking-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-letter-spacing)] leading-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-line-height)] whitespace-nowrap [font-style:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-style)] text-3xl ">
                PARTNER
              </div>
            </div>
          </Link>

          <Link
            href="/support"
            className="flex-1 max-w-[164px] h-[52px] rounded-[14.56px] border border-solid border-[#11867d80] shadow-[0px_2.08px_0px_#003941] [background:linear-gradient(180deg,rgba(15,114,124,1)_0%,rgba(0,78,86,1)_100%)]"
          >
            <div className="relative w-[119px] h-[26px] top-3 left-[23px]">
              <div className="[text-shadow:0px_3.12px_0px_#b64100] text-3xl font-bold text-wwwwwwMbuzz88comselective-yellow absolute w-[119px] h-[26px] top-0 left-0 font-www-wwwMbuzz88-com-segoe-UI-bold-upper  text-[length:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-size)] text-center tracking-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-letter-spacing)] leading-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-line-height)] whitespace-nowrap [font-style:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-style)]">
                Live Chat
              </div>
              <div className="[background:linear-gradient(180deg,#ffb800_25%,rgba(255,230,0,1)_40%,rgba(255,184,0,1)_54%,rgba(255,230,0,1)_69%,rgba(255,184,0,1)_83%)] [-webkit-background-clip:text] !bg-clip-text text-transparent [-webkit-text-fill-color:transparent] [text-fill-color:transparent]  absolute w-[119px] h-[26px] top-0 left-0 font-www-wwwMbuzz88-com-segoe-UI-bold-upper font-bold text-[length:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-size)] text-center tracking-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-letter-spacing)] leading-[var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-line-height)] whitespace-nowrap [font-style:var(--www-wwwMbuzz88-com-segoe-UI-bold-upper-font-style)] text-3xl ">
                Live Chat
              </div>
            </div>
          </Link>
        </div>

        {/* Game Center Title */}
        <div className="mb-4 !text-yellow-300 text-[length:var(--www-wwwMbuzz88-com-inter-bold-font-size)] tracking-[var(--www-wwwMbuzz88-com-inter-bold-letter-spacing)] leading-[var(--www-wwwMbuzz88-com-inter-bold-line-height)] whitespace-nowrap [font-style:var(--www-wwwMbuzz88-com-inter-bold-font-style)] text-lg font-bold">
          Game center
        </div>

        {/* Game Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "Slots",
            "Live Casino",
            "Poker",
            "Fish",
            "Sports",
            "E-sports",
            "Lottery",
          ].map((category) => (
            <div
              key={category}
              className="inline-flex flex-col h-8 items-start px-[10.36px] py-[7.24px] rounded-[5.2px] border border-solid border-[#23ffc866]"
            >
              <div className="relative w-fit text-[#23ffc8fa] mt-[-1.00px] mb-[-2.01px] [font-family:'Segoe_UI-Regular',Helvetica] font-normal text-wwwwwwMbuzz88combright-turquoise text-[15.6px] tracking-[0] leading-[normal]">
                {category}
              </div>
            </div>
          ))}
        </div>

        {/* Logo and Description */}
        <div className="flex gap-4 mb-6">
          {/* <div className="w-[72px] h-[72px] flex-shrink-0 bg-[url(https://res.cloudinary.com/dxs9u7pqc/image/upload/v1750485945/logo-sq_fe0b6y.jpg)] bg-cover bg-[50%_50%]" /> */}

          <Image
            src={logo_sq}
            alt="Winxebet"
            className="w-[72px] h-[72px] rounded-full object-cover"
          />
          <p className="text-white text-xs font-[number:var(--www-wwwMbuzz88-com-segoe-UI-regular-font-weight)] text-[length:var(--www-wwwMbuzz88-com-segoe-UI-regular-font-size)] tracking-[var(--www-wwwMbuzz88-com-segoe-UI-regular-letter-spacing)] leading-[var(--www-wwwMbuzz88-com-segoe-UI-regular-line-height)] [font-style:var(--www-wwwMbuzz88-com-segoe-UI-regular-font-style)]">
            winxebet.com website is operated by company, under license number
            AE6427EQRW00034 issued to it and regulated by Gaming Services
            Provider N.V., authorized by the Government of Curaçao under license
            number 1668JAZ.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mb-8">
          <div className="w-[26px] h-[26px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/facebook.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[26px] h-[26px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/telegram.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[26px] h-[26px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/age-d182eefd-png.png)] bg-cover bg-[50%_50%]" />
        </div>

        {/* Game Provider Logos */}
        {/* Game Provider Logos */}
        <div className="grid grid-cols-6 gap-2">
          {/* Row 1 */}
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/jl-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/pg-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/spb-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/pp-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/pt-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/bng-color-png.png)] bg-cover bg-[50%_50%]" />

          {/* Row 2 */}
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/ng-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/btg-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/jff-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/l22-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/jdb-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/mnp-color-png.png)] bg-cover bg-[50%_50%]" />

          {/* Row 3 */}
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/fc-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/sg-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/obs-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/fp-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/ezg-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/5g-color-png.png)] bg-cover bg-[50%_50%]" />

          {/* Row 4 */}
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/ae-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/bt-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/759-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/bom-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/ne-color-png.png)] bg-cover bg-[50%_50%]" />
          <div className="w-[47px] h-[23px] bg-[url(https://c.animaapp.com/m9cwtgo4xBXHVx/img/rt-color-png.png)] bg-cover bg-[50%_50%]" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
