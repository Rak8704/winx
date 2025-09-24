/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import { ExtendedCard } from "@/types/api/card";
import BkashCard from "@/components/cards/BkashCard";
import NagadCard from "@/components/cards/NagadCard";
import { useCard } from "@/lib/store.zustond";

const WithdrawCards = ({ cards }: { cards: ExtendedCard[] }) => {
  const swiperRef = useRef<any>(null);
  const [activeCard, setActiveCard] = useState<ExtendedCard | null>(null);

  const setCard = useCard((state) => state.setCard);

  useEffect(() => {
    if (activeCard) {
      setCard(activeCard);
    }
  }, [activeCard]);

  return (
    <div className="">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 200,
          modifier: 1,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setActiveCard(cards[swiper.activeIndex]); // initial active
        }}
        onSlideChange={(swiper) => {
          setActiveCard(cards[swiper.activeIndex]); // update on slide change
        }}
      >
        {cards.map((card, i) => (
          <SwiperSlide key={i} className="max-w-max  ">
            {card.paymentWallet.walletName.toLowerCase() == "bkash" ? (
              <BkashCard
                bkashNumber={card.walletNumber}
                cardNumber={card.cardNumber}
                ownerName={card.container.ownerName}
              />
            ) : (
              <NagadCard
                nagadNumber={card.walletNumber}
                cardNumber={card.cardNumber}
                ownerName={card.container.ownerName}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WithdrawCards;
