"use client";

import React from "react";
import slider_1 from "@/../public/slider/slider-1.jpg";
import slider_2 from "@/../public/slider/slider-2.jpg";
import slider_3 from "@/../public/slider/slider-3.png";
import slider_4 from "@/../public/slider/slider-4.png";
import slider_5 from "@/../public/slider/slider-5.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // (optional but good for future updates)

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

const HeroSlider = () => {
  const sliders = [
    { image: slider_1 },
    { image: slider_2 },
    { image: slider_3 },
    { image: slider_4 },
    { image: slider_5 },
  ];

  return (
    <div className="my-4">
      <Swiper
        spaceBetween={10}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000, // 3 seconds
          disableOnInteraction: false, // continues after user interaction
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {sliders.map((slider, i) => (
          <SwiperSlide key={i}>
            <Image
              src={slider.image}
              alt={`slider-${i}`}
              placeholder="blur"
              className="w-full aspect-auto md:aspect-[9/3] object-cover rounded-2xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
