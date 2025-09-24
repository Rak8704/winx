import React from "react";

import no_data from "@/../public/empty-box.png";
import Image from "next/image";

const NoData = () => {
  return (
    <div>
      <Image className="w-[260px] mx-auto" alt="No Data Found" src={no_data} />

      <h3 className="text-center text-xl font-semibold text-[#3B79F2] mt-3">
        No Data
      </h3>
    </div>
  );
};

export default NoData;
