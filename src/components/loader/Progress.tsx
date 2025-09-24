"use client";
import { useEffect, useState } from "react";

const CircleProgress = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 30); // Change speed here
    return () => clearInterval(interval);
  }, []);

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center justify-center ">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6875F5" />
            <stop offset="100%" stopColor="#E74694" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          stroke="#1f2937"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        {/* Foreground circle with gradient */}
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-75"
        />
      </svg>

      <div className="absolute bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent font-bold text-2xl">
        {percent}%
      </div>
    </div>
  );
};

export default CircleProgress;
