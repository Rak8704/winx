import React, { FC, InputHTMLAttributes } from "react";

const PrimaryInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={`text-white w-full mb-2 outline-none text-sm px-8 py-3 bg-wwwwwwck-44-4comdaintree rounded-[10.4px] overflow-hidden border border-solid border-[#006165] focus:border-[#2f9396] shadow-[0px_2.08px_0px_#002631] placeholder:font-www-wwwck444-com-semantic-input font-[number:var(--www-wwwck444-com-semantic-input-font-weight)] placeholder:text-wwwwwwck444combright-turquoise placeholder:text-[length:var(--www-wwwck444-com-semantic-input-font-size)] placeholder:tracking-[var(--www-wwwck444-com-semantic-input-letter-spacing)] placeholder:leading-[var(--www-wwwck444-com-semantic-input-line-height)] placeholder:[font-style:var(--www-wwwck444-com-semantic-input-font-style)] ${className}`}
    />
  );
};

export default PrimaryInput;
