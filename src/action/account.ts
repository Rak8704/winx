/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import {
  AccountUpdateSchema,
  PasswordChangeSchema,
  SetPasswordChangeSchema,
} from "@/schema";
import bcrypt from "bcryptjs";

export const updateProfile = async (data: AccountUpdateSchema) => {
  try {
    const { phone, facebook, name } = data;

    const user = await findCurrentUser();

    if (!user) return { error: "Authentication Failed" };

    const exitingAccount = await db.user.findUnique({ where: { phone } });

    if (exitingAccount && user.id !== exitingAccount.id) {
      return { error: "Phone was used before" };
    }

    await db.user.update({
      where: { id: user.id },
      data: {
        facebook,
        name,
        phone,
      },
    });

    return { success: true };
  } catch (error) {
    console.log({ error });
    return { error: INTERNAL_SERVER_ERROR };
  }
};

export const updatePassword = async (data: PasswordChangeSchema) => {
  try {
    const { currentPassword, newPassword } = data;

    const user = await findCurrentUser();

    if (!user) return { error: "Authentication Failed" };

    const userPasswordHash = (
      await db.user.findUnique({
        where: { id: user!.id },
        select: { password: true },
      })
    )?.password;

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      userPasswordHash!
    );

    if (!isPasswordMatch) {
      return { error: "Current password is incorrect" };
    }

    if (currentPassword == newPassword) {
      return { error: "Try another password" };
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: newPasswordHash,
      },
    });

    return { success: true };
  } catch {
    return { error: INTERNAL_SERVER_ERROR };
  }
};

export const updateWithdrawPassword = async (data: PasswordChangeSchema) => {
  try {
    const { currentPassword, newPassword } = data;

    const user = await findCurrentUser();

    if (!user) return { error: "Authentication Failed" };

    const userPasswordHash = (
      await db.user.findUnique({
        where: { id: user!.id },
        select: { withdrawPassword: true },
      })
    )?.withdrawPassword;

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      userPasswordHash!
    );

    if (!isPasswordMatch) {
      return { error: "Current password is incorrect" };
    }

    if (currentPassword == newPassword) {
      return { error: "Try another password" };
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await db.user.update({
      where: { id: user.id },
      data: {
        withdrawPassword: newPasswordHash,
      },
    });

    return { success: true };
  } catch {
    return { error: INTERNAL_SERVER_ERROR };
  }
};

export const setWithdrawPassword = async (data: SetPasswordChangeSchema) => {
  try {
    const { password } = data;
    const user: any = await findCurrentUser();

    if (user.withdrawPassword) {
      return { error: "Please update the password" };
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { id: user.id },
      data: {
        withdrawPassword: hashpassword,
      },
    });
    return { success: true };
  } catch {
    return { error: INTERNAL_SERVER_ERROR };
  }
};
