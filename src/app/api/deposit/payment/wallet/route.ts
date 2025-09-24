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

    // Get payment wallets from database
    const paymentWallets = await db.paymentWallet.findMany();

    // Get deposit wallets separately
    const depositWallets = await db.depositWallet.findMany();

    // Get bonus settings
    const bonus = await db.bonus.findFirst();

    // Combine payment wallets with their deposit settings
    const wallets = paymentWallets.map(pw => {
      const depositWallet = depositWallets.find(dw => dw.paymentWalletId === pw.id);
      return {
        id: pw.id,
        name: pw.walletName,
        image: pw.walletLogo,
        label: pw.walletName,
        min_deposit: depositWallet?.minDeposit ? parseFloat(depositWallet.minDeposit.toString()) : 100,
        max_deposit: depositWallet?.maximumDeposit ? parseFloat(depositWallet.maximumDeposit.toString()) : 50000,
        instructions: depositWallet?.instructions || "",
        warning: depositWallet?.warning || "",
        isActive: depositWallet?.isActive ?? true,
      };
    });

    return NextResponse.json({
      payload: {
        wallets,
        bonus: {
          signinBonus: bonus?.signinBonus || 5,
          referralBonus: bonus?.referralBonus || 5,
        }
      }
    });
  } catch (error) {
    console.error("Deposit payment wallet error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
