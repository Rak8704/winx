import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const paymentWallets = await db.paymentWallet.findMany({ where: {} });

    // Get deposit wallets first
    const depositWallets = await db.depositWallet.findMany();
    
    // Filter payment wallets that have corresponding deposit wallets
    const allowedPaymentWallets = paymentWallets.filter((wallet) => {
      return depositWallets.some(dw => dw.paymentWalletId === wallet.id);
    });

    return Response.json(
      { paymentWallets: allowedPaymentWallets },
      { status: 200 }
    );
  } catch {
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
