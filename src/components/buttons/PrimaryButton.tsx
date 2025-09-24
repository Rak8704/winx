import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 ${className}`}
      style={{
        background:
          "linear-gradient(180deg, var(--color-cyan-27, #0F727C) 0%, var(--color-cyan-17, #004E56) 100%)",
        boxShadow: "0px 1.0399999618530273px 0px #003941",
        borderRadius: 6.24,
        outline: "1px var(--color-cyan-30-50%, rgba(17, 134, 125, 0.50)) solid",
        outlineOffset: "-1px",
        justifyContent: "center",
        alignItems: "center",
        display: "inline-flex",
      }}
      {...props}
    >
      {" "}
      <div
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "var(--color-orange-64, #FFAB49)",
          fontSize: 15,
          fontFamily: "Segoe UI",
          fontWeight: "700",

          wordWrap: "break-word",
          textShadow: "0px 1px 0px rgba(17, 0, 0, 0.30)",
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default PrimaryButton;
