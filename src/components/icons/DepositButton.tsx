import React from "react";

interface IconDepositProps {
  className?: string;
}

function IconDeposit({ className = "" }: IconDepositProps) {
  return (
    <div
      className={`overflow-hidden font-bold text-center text-orange-400 bg-cover border-orange-400 decoration-orange-400 fill-orange-400 h-[30px] outline-orange-400 w-[30px] ${className}`}
    >
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<svg class="am-icon am-icon-icon-deposit_7625b392 am-icon-md" style=" background-size: cover; border-color: rgb(255, 171, 73); color: rgb(255, 171, 73); fill: rgb(255, 171, 73); font-weight: 700; height: 29.952px; line-height: normal; margin-right: 11.52px; outline-color: rgb(255, 171, 73); overflow-clip-margin: content-box; overflow-x: hidden; overflow-y: hidden; text-align: center; text-decoration-color: rgb(255, 171, 73); text-emphasis-color: rgb(255, 171, 73); text-shadow: rgba(17, 0, 0, 0.3) 0px 1.152px 0px; width: 29.952px;"><use xlink:href="#icon-deposit_7625b392"></use></svg>',
        }}
      />
    </div>
  );
}

export default IconDeposit;
