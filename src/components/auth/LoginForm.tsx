"use client";
import React, { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RiCloseCircleLine } from "react-icons/ri";
import zod from "zod";
import { loginSchema } from "@/schema";
import Variant1 from "../icons/Variant2";

import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import { IoLockOpen } from "react-icons/io5";
import { login } from "@/action/login";
import { redirect, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import SpinLoader from "../loader/SpinLoader";

const LoginForm = () => {
  const [pending, startTransiction] = useTransition();
  const customRedirect = useSearchParams().get("redirect") || "";

  const form = useForm<zod.infer<typeof loginSchema>>({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: zod.infer<typeof loginSchema>) => {
    startTransiction(() => {
      login(data).then((res) => {
        if (res && res.success) {
          redirect(customRedirect || "/");
        } else if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  const [passwordShow, setPasswordShow] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({ password: false, confirmPassword: false });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <input
                      placeholder="Enter Phone"
                      disabled={pending}
                      {...field}
                      className="text-white w-full mb-2 outline-none text-sm px-8 py-3 bg-wwwwwwck-44-4comdaintree rounded-[10.4px] overflow-hidden border border-solid border-[#006165] focus:border-[#2f9396] shadow-[0px_2.08px_0px_#002631] placeholder:font-www-wwwck444-com-semantic-input font-[number:var(--www-wwwck444-com-semantic-input-font-weight)] placeholder:text-wwwwwwck444combright-turquoise placeholder:text-[length:var(--www-wwwck444-com-semantic-input-font-size)] placeholder:tracking-[var(--www-wwwck444-com-semantic-input-letter-spacing)] placeholder:leading-[var(--www-wwwck444-com-semantic-input-line-height)] placeholder:[font-style:var(--www-wwwck444-com-semantic-input-font-style)]"
                    />

                    <div className="flex w-[19px] h-[19px] items-center justify-center absolute top-[45%] -translate-y-1/2 left-2.5">
                      <Variant1 className="!relative !flex-1 !grow !h-[18.72px]" />
                    </div>

                    {form.getValues("phone") && (
                      <button
                        onClick={() => form.setValue("phone", "")}
                        className="flex w-[19px] h-[19px] items-center justify-center absolute top-[45%] -translate-y-1/2 right-2.5"
                      >
                        <RiCloseCircleLine className="!relative !flex-1 !grow !h-[18.72px] text-wwwwwwck444combright-turquoise " />
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <input
                      type={passwordShow.password ? "text" : "password"}
                      placeholder="Password"
                      disabled={pending}
                      {...field}
                      className="text-white w-full mb-2 outline-none text-sm px-8 py-3 bg-wwwwwwck-44-4comdaintree rounded-[10.4px] overflow-hidden border border-solid border-[#006165] focus:border-[#2f9396] shadow-[0px_2.08px_0px_#002631] placeholder:font-www-wwwck444-com-semantic-input font-[number:var(--www-wwwck444-com-semantic-input-font-weight)] placeholder:text-wwwwwwck444combright-turquoise placeholder:text-[length:var(--www-wwwck444-com-semantic-input-font-size)] placeholder:tracking-[var(--www-wwwck444-com-semantic-input-letter-spacing)] placeholder:leading-[var(--www-wwwck444-com-semantic-input-line-height)] placeholder:[font-style:var(--www-wwwck444-com-semantic-input-font-style)]"
                    />

                    <div className="flex w-[19px] h-[19px] items-center justify-center absolute top-[45%] -translate-y-1/2 left-2.5">
                      <IoLockOpen className="!relative !flex-1 !grow !h-[18.72px] text-wwwwwwck444combright-turquoise" />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setPasswordShow((state) => ({
                          ...state,
                          password: !state.password,
                        }))
                      }
                      className="flex w-[19px] h-[19px] items-center justify-center absolute top-[45%] -translate-y-1/2 right-2.5"
                    >
                      {passwordShow.password ? (
                        <FaEye className="!relative !flex-1 !grow !h-[18.72px] text-wwwwwwck444combright-turquoise " />
                      ) : (
                        <FaEyeSlash className="!relative !flex-1 !grow !h-[18.72px] text-wwwwwwck444combright-turquoise " />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            disabled={pending}
            className="mt-4 disabled:!bg-[#ffffff0e] disabled:!backdrop-blur-sm disable:!border-white/50 disabled:!text-white/15 "
            style={{
              inlineSize: "100%",
              alignSelf: "stretch",
              blockSize: 33.27,
              padding: 1,
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
          >
            <div
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  maxBlockSize: 17.94,
                  textAlign: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--color-orange-36, #B64100)",
                  fontSize: 15.6,
                  fontFamily: "Segoe UI",
                  fontWeight: "700",
                  blockSize: 17.94,
                  wordWrap: "break-word",
                  textShadow: "0px 1px 0px rgba(159, 52, 0, 0.20)",
                }}
              >
                Login
              </div>
            </div>
          </button>
        </form>
      </Form>
      {pending && <SpinLoader />}
    </>
  );
};

export default LoginForm;
