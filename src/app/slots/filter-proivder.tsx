/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { providers } from "../../../data/api-providers";
import Image from "next/image";
import { Title } from "@/types/game";

const FilterProivder = ({
  onSelect,
}: {
  onSelect: (provider: Title) => void;
}) => {
  const [selectedProvider, setProvider] = useState<any>("all");

  const selectorStyle = {
    active: {
      background:
        "linear-gradient(180deg, var(--color-yellow-50, #FFE600) 0%, var(--color-orange-50, #FFB800) 100%)",
      boxShadow:
        "0px 1.3760000467300415px 0px 2.375999927520752px #FFF2A6 inset",
      overflow: "hidden",
      borderRadius: 11.01,
      outline:
        "1px var(--color-yellow-83-50%, rgba(255, 242, 166, 0.50)) solid",
      outlineOffset: "-1px",
      justifyContent: "center",
      alignItems: "center",
      display: "inline-flex",
    },
    inActive: {
      background:
        "linear-gradient(180deg, var(--color-cyan-27, #0F727C) 0%, var(--color-cyan-17, #004E56) 100%)",
      boxShadow: "0px 1.3760000467300415px 0px #005540",
      borderRadius: 11.01,
      outline: "1px var(--color-cyan-57-10%, rgba(35, 255, 200, 0.10)) solid",
      outlineOffset: "-1px",
      justifyContent: "center",
      alignItems: "center",
      display: "inline-flex",
    },
  };

  useEffect(() => {
    onSelect(selectedProvider);
  }, [selectedProvider]);

  return (
    <div>
      <div className="w-full bg-wwwwwwck-44-4comdaintree mb-3 rounded-[10.4px] px-5 py-2 overflow-hidden border border-solid border-[#006165] shadow-[0px_2.08px_0px_#002631]">
        <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
          <SwiperSlide className="max-w-max">
            <div
              className="h-[45px] px-4  py-3"
              onClick={() => setProvider("all")}
              style={
                selectedProvider == "all"
                  ? selectorStyle.active
                  : selectorStyle.inActive
              }
            >
              <span
                className={`block px-3 text-lg font-bold ${
                  selectedProvider == "all" ? "text-black" : "text-white"
                }`}
              >
                All
              </span>
            </div>
          </SwiperSlide>

          {providers.map((provider, i) => (
            <SwiperSlide key={i} className="max-w-max">
              <div
                className="h-[45px] px-4 py-3"
                onClick={() => setProvider(provider.name)}
                style={
                  provider.name == selectedProvider
                    ? selectorStyle.active
                    : selectorStyle.inActive
                }
              >
                <Image
                  src={
                    selectedProvider == provider.name
                      ? provider.imageBlack
                      : provider.imageWhite
                  }
                  alt={provider.name}
                  className="max-w-[85px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FilterProivder;
