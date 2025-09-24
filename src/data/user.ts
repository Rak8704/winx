import { auth } from "@/auth";
import { db } from "@/lib/db";

export const findUserById = async (id: string) => {
  return await db.user.findUnique({ where: { id } });
};

export const findUserByPhone = async (phone: string) => {
  return await db.user.findUnique({ where: { phone } });
};

export const findUserByPlayerId = async (playerId: string) => {
  return await db.user.findUnique({ where: { playerId } });
};

export const findUserByReferId = async (referId: string) => {
  return await db.user.findUnique({ where: { referId } });
};

export const findCurrentUser = async () => {
  const session = await auth();
  console.log("session in findCurrentUser:", session);
  
  // Ensure we return a proper user object with ID
  if (session?.user) {
    console.log("User found in session:", session.user);
    return session.user;
  }
  
  console.log("No user found in session");
  return null;
};
