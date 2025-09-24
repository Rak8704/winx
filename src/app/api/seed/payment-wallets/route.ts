/* eslint-disable @typescript-eslint/no-unused-vars */
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Create payment wallets with valid image URLs
    await db.paymentWallet.createMany({
      data: [
        {
          walletName: "bKash",
          walletLogo: "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607129/mbuzz88/kdi4ajsyggxdjl8xvyy5.png",
          walletType: "EWALLET",
        },
        {
          walletName: "Nagad",
          walletLogo: "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607134/mbuzz88/ittgozvoezof3cqbprik.png",
          walletType: "EWALLET",
        },
        {
          walletName: "Upay",
          walletLogo: "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607130/mbuzz88/dx7stvyko3gvwvrwgxwx.png",
          walletType: "EWALLET",
        },
        {
          walletName: "Rocket",
          walletLogo: "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607131/mbuzz88/mqo9muoc3pevb6kff8jb.png",
          walletType: "EWALLET",
        },
        {
          walletName: "DurantoPay",
          walletLogo: "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607130/mbuzz88/xrqqj8zdn7dtdwcsn4wd.png",
          walletType: "EWALLET",
        },
      ],
      skipDuplicates: true,
    });

    // Create corresponding deposit wallets
    const paymentWallets = await db.paymentWallet.findMany();
    
    for (const wallet of paymentWallets) {
      const existingDepositWallet = await db.depositWallet.findFirst({
        where: { paymentWalletId: wallet.id }
      });
      
      if (!existingDepositWallet) {
        await db.depositWallet.create({
          data: {
            paymentWalletId: wallet.id,
            walletsNumber: [],
            instructions: `Send money to our ${wallet.walletName} account`,
            trxType: "mobile",
            minDeposit: 100,
            maximumDeposit: 50000,
            isActive: true,
          }
        });
      }
    }

    return Response.json({ success: true, message: "Payment wallets seeded successfully" });
  } catch (error) {
    console.log({ error });
    return Response.json({ error: INTERNAL_SERVER_ERROR });
  }
};