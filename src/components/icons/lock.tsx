/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
const Lock = (props: any) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 36 36"
    preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="tailwind-gradient" x1={0} y1={0} x2={1} y2={0}>
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <title>{"lock-solid"}</title>
    <path
      className="clr-i-solid clr-i-solid-path-1"
      d="M26,15V10.72a8.2,8.2,0,0,0-8-8.36,8.2,8.2,0,0,0-8,8.36V15H7V32a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V15ZM19,25.23V28H17V25.14a2.4,2.4,0,1,1,2,.09ZM24,15H12V10.72a6.2,6.2,0,0,1,6-6.36,6.2,6.2,0,0,1,6,6.36Z"
      fill="url(#tailwind-gradient)"
    />
    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
  </svg>
);
export default Lock;
