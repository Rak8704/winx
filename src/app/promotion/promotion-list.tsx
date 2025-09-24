/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { promotions } from "../../../data/promotions";
import Image from "next/image";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import Link from "next/link";

import top_left from "@/../public/frame/icon-top-left.png";
import top_right from "@/../public/frame/icon-top-right.png";
import bottom_left from "@/../public/frame/icon-bottom-left.png";
import bottom_right from "@/../public/frame/icon-bottom-right.png";

const PromotionList = () => {
  return (
    <div className="px-4 py-8 app">
      <h3 className="text-2xl font-bold text-[#23FFC8] mb-5">PROMOTION</h3>

      <div className="space-y-5">
        {promotions.map((promtion, i) => (
          <Promotion
            key={i}
            name={promtion.title}
            id={promtion.id}
            image={promtion.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionList;
export const Promotion = ({
  name,
  image,
  id,
}: {
  name: string;
  id: number;
  image: any;
}) => {
  return (
    <div className="relative w-full">
      <Image alt={name} src={image} className="w-full rounded-lg" />
      <div className="bg-[#002632] p-4 rounded-b-md">
        <div className="flex items-center justify-between ">
          <h4 className="text-lg text-white font-semibold max-w-[70%] line-clamp-1">
            {name}
          </h4>
          <Link href={`/promotion/${id}`} className="relative z-[10]">
            <SecondaryButton>View</SecondaryButton>
          </Link>
        </div>
      </div>

      <div className="absolute -top-1 -left-2">
        <Image
          src={top_left}
          alt="top left frame"
          className="w-[70px] select-none"
        />
      </div>

      <div className="absolute -top-1 -right-2">
        <Image
          src={top_right}
          alt="top right frame"
          className="w-[70px] select-none"
        />
      </div>

      <div className="absolute -bottom-1 -left-1">
        <Image
          src={bottom_left}
          alt="bottom left frame"
          className="w-[70px] select-none"
        />
      </div>

      <div className="absolute -bottom-1 -right-1">
        <Image
          src={bottom_right}
          alt="bottom left frame"
          className="w-[70px] select-none"
        />
      </div>
    </div>
  );
};
