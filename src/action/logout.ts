"use server";

import { signOut } from "@/auth";
import { INTERNAL_SERVER_ERROR } from "@/error";

export const logout = async () => {
  try {
    await signOut({ redirect: false });

    return { success: true };
  } catch {
    return { error: INTERNAL_SERVER_ERROR };
  }
};
