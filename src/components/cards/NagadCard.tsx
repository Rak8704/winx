"use client";
import React, { useState } from "react";

import ic from "@/../public/ic.png";
import Image from "next/image";

interface NagadCardOwnerProps {
  ownerName: string;
  nagadNumber: string;
  cardNumber: string;
}

const NagadCard = ({
  ownerName,
  nagadNumber,
  cardNumber,
}: NagadCardOwnerProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="p-5 max-sm:p-2.5">
      <article
        className="relative mx-auto my-0 transition-transform cursor-pointer duration-700 h-[280px] w-[440px] max-sm:h-[186px] max-sm:w-[300px]"
        onClick={toggleFlip}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
        }}
        aria-label="Interactive credit card, click to flip"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleFlip();
          }
        }}
      >
        <CardFront cardNumber={cardNumber} ownerName={ownerName} />
        <CardBack nagadNumber={nagadNumber} />
      </article>
    </section>
  );
};

export default NagadCard;

const CardFront = ({
  cardNumber,
  ownerName,
}: {
  cardNumber: string;
  ownerName: string;
}) => {
  return (
    <section
      className="absolute p-6 rounded-2xl  size-full text-white max-sm:p-4 bg-gradient-to-r from-[#F95F35] to-[#F98D2B] backface-hidden"
      style={{ backfaceVisibility: "hidden" }}
      aria-label="Credit card front"
    >
      <header className="flex justify-between items-start mb-10">
        <Image
          placeholder="blur"
          alt="nagad"
          src={ic}
          className="object-cover overflow-hidden  aspect-square w-[35px]"
        />
        <p className="text-sm text-right">Nagad</p>
      </header>

      <p className="mb-4 text-2xl tracking-[3px] max-sm:text-lg font-mono">
        •••• •••• •••• {cardNumber.slice(-4)}
      </p>

      <footer className="flex justify-between items-end pb-3">
        <div>
          <p className="mb-1 text-xs opacity-80">CARD HOLDER</p>
          <p className="text-base max-sm:text-sm uppercase">{ownerName}</p>
        </div>
        <div>
          <p className="mb-1 text-xs opacity-80">EXPIRES</p>
          <p className="text-base max-sm:text-sm">12/28</p>
        </div>
      </footer>
    </section>
  );
};

const CardBack = ({ nagadNumber }: { nagadNumber: string }) => {
  return (
    <section
      className="absolute rounded-2xl ] size-full bg-gradient-to-r from-[#F95F35] to-[#F98D2B]"
      style={{
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
      aria-label="Credit card back"
    >
      <div
        className="mt-8 w-full bg-zinc-800 h-[50px] pl-4"
        aria-label="Magnetic stripe"
      >
        <p className="-mb-1 text-sm text-white">Nagad Number</p>
        <p className="text-lg tracking-wider text-white font-mono">
          {nagadNumber}
        </p>
      </div>

      <div className="relative p-5">
        <div className="flex relative justify-end items-center p-2.5 mt-5 h-10 bg-white rounded">
          <p className="text-base text-zinc-800">CVV 123</p>
        </div>
      </div>
    </section>
  );
};
