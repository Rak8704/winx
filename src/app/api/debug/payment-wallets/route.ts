import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Get all payment wallets
    const paymentWallets = await db.paymentWallet.findMany({
      include: {
        depositWallets: true
      }
    });

    return Response.json({ 
      success: true, 
      paymentWallets,
      count: paymentWallets.length
    });
  } catch (error) {
    console.error("Error fetching payment wallets:", error);
    return Response.json({ 
      success: false, 
      error: "Failed to fetch payment wallets" 
    }, { status: 500 });
  }
};