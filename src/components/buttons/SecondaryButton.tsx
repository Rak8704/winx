import React from "react";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={` px-4 py-2 ${className}`}
      style={{
        minWidth: 70.72,

        background:
          "linear-gradient(180deg, var(--color-yellow-50, #FFE600) 0%, var(--color-orange-50, #FFB800) 100%)",
        boxShadow: "0px 1.0399999618530273px 0px #B64100",
        overflow: "hidden",
        borderRadius: 6.24,
        outline:
          "1px var(--color-yellow-83-50%, rgba(255, 242, 166, 0.50)) solid",
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
          color: "var(--color-orange-36, #B64100)",
          fontSize: 14,
          fontFamily: "Segoe UI",
          fontWeight: "700",

          wordWrap: "break-word",
          textShadow: "0px 1px 0px rgba(159, 52, 0, 0.20)",
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default SecondaryButton;
