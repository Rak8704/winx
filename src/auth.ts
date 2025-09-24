/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { db } from "./lib/db";
import authConfig from "./auth.config";

export const { signIn, signOut, auth, handlers } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - token:", token, "user:", user);
      if (user) {
        token.sub = user.id;
      }
      console.log("JWT callback - updated token:", token);
      return token;
    },

    async session({ token, session }: { token: any; session: any }) {
      console.log("Session callback - token:", token, "session:", session);

      if (token.sub && session.user) {
        console.log("Fetching user from DB with ID:", token.sub);

        try {
          const user = await db.user.findUnique({
            where: { id: token.sub },
            select: {
              id: true,
              phone: true,
              name: true,
              password: true,
              playerId: true, // local DB playerId
              gameXAPlayerId: true, // GameXA Player ID
              isBanned: true,
              referId: true,
              createdAt: true,
              email: true,
              wallet: {
                select: {
                  id: true,
                  balance: true,
                  signinBonus: true,
                  referralBonus: true,
                  currency: true,
                  turnOver: true,
                  userId: true,
                  playerId: true,
                },
              },
            },
          });

          console.log("Session callback - user from DB:", user);

          if (user) {
            // Clear password for security
            const userWithoutPassword = { ...user, password: "" };

            session.user = {
              ...userWithoutPassword,
              id: user.id,
              email: user.email || "",
              emailVerified: new Date(),

              // ✅ GameXA playerId ensure করা হলো
              gameXAPlayerId: user.gameXAPlayerId || user.playerId,

              // ✅ wallet সঠিকভাবে session এ যোগ করা হলো
              wallet: {
                ...user.wallet,
                playerId: user.gameXAPlayerId || user.playerId,
              },
            };

            console.log("✅ Session user updated with wallet:", session.user);
          }
        } catch (error) {
          console.error("❌ Error fetching user from DB:", error);
        }
      }

      console.log("Session callback - updated session:", session);
      return session;
    },
  },
});
