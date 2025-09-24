import { findCurrentUser } from "@/data/user";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await findCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    // Get user's wallet
    const wallet = await db.wallet.findUnique({
      where: { userId: user.id },
    });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // Calculate available balance (main balance - turnover requirement)
    const availableBalance = Math.max(0, parseFloat(wallet.balance.toString()) - parseFloat(wallet.turnOver.toString()));

    // Get site settings for withdrawal limits
    const siteSettings = await db.siteSetting.findFirst();
    const maxWithdraw = siteSettings?.maxWithdraw ? parseFloat(siteSettings.maxWithdraw.toString()) : 50000;
    const minWithdraw = siteSettings?.minWithdraw ? parseFloat(siteSettings.minWithdraw.toString()) : 100;

    // Calculate remaining withdrawal amount for today
    // This is a simplified calculation - you might want to implement daily limits
    const remainingWithdrawal = maxWithdraw;

    return NextResponse.json({
      availableBalance: availableBalance.toString(),
      mainBalance: wallet.balance.toString(),
      remainingWithdrawal: remainingWithdrawal.toString(),
      turnOver: wallet.turnOver.toString(),
      currency: wallet.currency,
      minWithdraw: minWithdraw.toString(),
      maxWithdraw: maxWithdraw.toString(),
    });
  } catch (error) {
    console.error("Withdraw page data error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
