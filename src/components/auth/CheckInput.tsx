/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";

import check from "@/../public/icons/check.svg";
import uncheck from "@/../public/icons/uncheck.svg";
import Image from "next/image";

interface CheckInputProps {
  label: string;
  onChecked: (checked: boolean) => void;
  defaultCheck?: boolean;
}
const CheckInput = ({
  label,
  onChecked,
  defaultCheck = false,
}: CheckInputProps) => {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (defaultCheck) {
      setChecked(defaultCheck);
    }
  }, [defaultCheck]);

  useEffect(() => {
    onChecked(isChecked);
  }, [isChecked]);

  return (
    <button
      type="button"
      onClick={() => setChecked(!isChecked)}
      className="flex items-center gap-2 w-full"
    >
      <div className="w-[35px] ">
        <Image
          src={isChecked ? check : uncheck}
          alt={"check"}
          className="w-full h-auto select-none"
        />
      </div>
      <p className="text-white/80 text-xs text-start flex-1">{label}</p>
    </button>
  );
};

export default CheckInput;
