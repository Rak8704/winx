import React from "react";
// import Variant1 from "@/components/icons/Variant1";
// import Variant2 from "@/components/icons/Variant2";
import Link from "next/link";
// import { Variant3 } from "../../icons/Variant3";

interface AuthContainerProps {
  title: string;
  formRedirectText: string;
  formRedirectLink: string;
  formRedirectLinkPlaceholder: string;
  children: React.ReactNode;
}
import logo from "@/../public/logo.png";
import Image from "next/image";

const AuthContainer = ({
  formRedirectText,
  formRedirectLink,
  formRedirectLinkPlaceholder,
  children,
  title,
}: AuthContainerProps) => {
  return (
    <div className="bg-[url(https://c.animaapp.com/m9drzmnaxdV67z/img/background.png)] bg-[#003e3e] bg-cover bg-[50%_50%] w-h-full h-screen ">
      <div className="flex justify-center py-5 pt-12">
        <Image src={logo} alt="ck444" className="w-[100px] h-auto" />
      </div>

      <div className="flex flex-col items-center mb-2">
        <h4 className="text-[#ffb800] font-bold text-xl mb-3">{title}</h4>

        <p className="text-white/90 text-sm text-center mt-3">
          {formRedirectText}{" "}
          <Link
            href={formRedirectLink}
            className="text-[#41cbd0] font-semibold hover:underline"
          >
            {formRedirectLinkPlaceholder}
          </Link>
        </p>
      </div>

      <div className="w-[80%] mx-auto mt-8 max-w-[400px]">{children}</div>
    </div>
  );
};
export default AuthContainer;
