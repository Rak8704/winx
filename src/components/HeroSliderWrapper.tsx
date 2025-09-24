"use client";

import dynamic from "next/dynamic";

const HeroSlider = dynamic(() => import("./HeroSlider"), { ssr: false });

const HeroSliderWrapper = () => {
  return <HeroSlider />;
};

export default HeroSliderWrapper;