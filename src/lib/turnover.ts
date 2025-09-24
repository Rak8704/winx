import { db } from "./db";

export const reduceTurnOver = async (amount: number, userId: string) => {
  const wallet = await db.wallet.findUnique({
    where: { userId },
    select: { turnOver: true },
  });

  if (!wallet) throw new Error("Wallet not found");

  const newTurnOver = Math.max(0, +wallet.turnOver - amount);

  await db.wallet.update({
    where: { userId },
    data: {
      turnOver: newTurnOver,
    },
  });

  return true;
};
