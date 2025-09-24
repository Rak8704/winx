import { findCurrentUser } from "@/data/user";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await findCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    const wallet = await db.wallet.findUnique({ where: { userId: user.id } });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json({
      payload: {
        wallets: [{
          id: wallet.id,
          balance: wallet.balance,
          currency: wallet.currency,
          userId: wallet.userId
        }]
      }
    });
  } catch (err: any) {
    console.error("Wallet fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
