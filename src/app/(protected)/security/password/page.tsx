"use client";
import { updatePassword } from "@/action/account";
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
import { passwordChangeSchema, PasswordChangeSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const PasswordChange = () => {
  const [pending, startTr] = useTransition();

  const form = useForm<PasswordChangeSchema>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(passwordChangeSchema),
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader title="Change Password" />

      <div className="px-5 py-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <FormField
              control={form.control}
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
              control={form.control}
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
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasswordChange;
