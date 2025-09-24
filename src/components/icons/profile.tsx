/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
const Profile = (props: any) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="tailwind-gradient" x1={0} y1={0} x2={1} y2={0}>
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    <g id="style=fill">
      <g id="profile">
        <path
          id="vector (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z"
          fill="url(#tailwind-gradient)"
        />
        <path
          id="rec (Stroke)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 4.25 20.8792 4.25 18.5714Z"
          fill="url(#tailwind-gradient)"
        />
      </g>
    </g>
  </svg>
);
export default Profile;
