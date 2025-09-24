/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { updateProfile } from "@/action/account";
import SiteHeader from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCurrentUser from "@/hook/useCurrentUser";
import { accountUpdateSchema, AccountUpdateSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MyAccount = () => {
  const user : any = useCurrentUser();
  const [pending, startTr] = useTransition();

  const form = useForm<AccountUpdateSchema>({
    defaultValues: {
      facebook: user!.facebook || "",
      name: user!.name || "Pro User",
      phone: user!.phone || "",
    },
    resolver: zodResolver(accountUpdateSchema),
  });

  const handleUpdate = (data: AccountUpdateSchema) => {
    startTr(() => {
      updateProfile(data).then((res) => {
        if (res.error) {
          toast.error(res.error);
        }
        else if(res && res.success){
          toast.success("Information Updated")
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader title="My Account" />

      <div className="px-5 py-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pending}
                      type="text"
                      {...field}
                      placeholder="User Name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="playerid"
              render={() => (
                <FormItem>
                  <FormLabel>Player ID</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      disabled
                      value={"932745783"}
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pending}
                      type="text"
                      {...field}
                      placeholder="Phone Number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      disabled={pending}
                      type="text"
                      {...field}
                      placeholder="Your Facebook Link"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Link
              href="/security"
              className="my-3 block text-sm font-medium text-indigo-600 underline"
            >
              Check Account safty
            </Link>

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

export default MyAccount;
