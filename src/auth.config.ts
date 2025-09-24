import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export default {
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        phone: { name: "phone", type: "text" },
        password: { name: "password", type: "password" },
      },

     async authorize(credentials) {
  const userPhone = (credentials!.phone as string) || "";
  const password = (credentials!.password as string) || "";

  if (!userPhone || !password) throw new Error("Invalid Credentials");

  const account = await db.user.findUnique({
    where: { phone: userPhone },
  });

  if (!account) throw new Error("Account not found");

  const passwordIsMatch = await bcrypt.compare(password, account.password);
  if (!passwordIsMatch) throw new Error("Invalid Password");

  // ✅ Cast to User type so TS এখন বুঝবে gameXAPlayerId আছে
  return account as any;
}

    }),
  ],
} satisfies NextAuthConfig;
