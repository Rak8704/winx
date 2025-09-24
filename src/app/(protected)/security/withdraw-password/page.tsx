/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { setWithdrawPassword, updatePassword } from "@/action/account";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCurrentUser from "@/hook/useCurrentUser";
import {
  passwordChangeSchema,
  PasswordChangeSchema,
  setPasswordChangeSchema,
  SetPasswordChangeSchema,
} from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PasswordChange = () => {
  const user: any = useCurrentUser();

  const [pending, startTr] = useTransition();

  const formUpdate = useForm<PasswordChangeSchema>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(passwordChangeSchema),
  });

  const formSet = useForm<SetPasswordChangeSchema>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(setPasswordChangeSchema),
  });

  const handleUpdate = (data: PasswordChangeSchema) => {
    startTr(() => {
      updatePassword(data).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else if (res && res.success) {
          toast.success("Password Changed successfully");
        }
      });
    });
  };

  const handleSet = (data: SetPasswordChangeSchema) => {
    startTr(() => {
      setWithdrawPassword(data).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else if (res && res.success) {
          toast.success("Password Set successfully");
          location.reload();
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader title="Change Withdraw Password" />

      <div className="px-5 py-7">
        {user.withdrawPassword ? (
          <Form {...formUpdate}>
            <form onSubmit={formUpdate.handleSubmit(handleUpdate)}>
              <FormField
                control={formUpdate.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={pending}
                        type="password"
                        {...field}
                        placeholder="Enter Current Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formUpdate.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={pending}
                        type="password"
                        {...field}
                        placeholder="Enter New Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={pending}
                className="w-full rounded-sm bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-600 mt-3"
              >
                Change
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...formSet}>
            <form onSubmit={formSet.handleSubmit(handleSet)}>
              <FormField
                control={formSet.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={pending}
                        type="password"
                        {...field}
                        placeholder="Enter Current Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={pending}
                className="w-full rounded-sm bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-600 mt-3"
              >
                Set
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
};

export default PasswordChange;
