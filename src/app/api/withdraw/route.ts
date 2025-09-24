// src/app/api/withdraw/route.ts
import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { createPayout, generateInvoiceNumber } from "@/lib/api/durantoPayApi";
import { createNotification } from "@/action/notifications";
import { withdrawFromPlayer } from "@/lib/api/gamexaApi";

export const POST = async (req: NextRequest) => {
  try {
    const { account_number, amount, ps } = await req.json();

    // Validate required fields
    if (!account_number || !amount || !ps) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: account_number, amount, and ps are required"
      }, { status: 400 });
    }

    const user: any = await findCurrentUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 401 });

    const wallet = await db.wallet.findUnique({ where: { userId: user.id } });
    if (!wallet || parseFloat(wallet.balance.toString()) < parseFloat(amount)) {
      return NextResponse.json({ success: false, message: "Insufficient balance" }, { status: 400 });
    }

    const invoice_no = generateInvoiceNumber();

    // DurantoPay payout
    let payoutResponse;
    try {
      payoutResponse = await createPayout({
        invoice_no,
        pay_type: ps,
        wallet_number: account_number,
        amount: amount.toString(),
      });
    } catch (apiError: any) {
      console.error("Durantopay payout API call failed:", apiError);
      return NextResponse.json({ success: false, message: "Withdraw service temporarily unavailable. Please try again later." }, { status: 500 });
    }

    if (!payoutResponse || payoutResponse.status !== 0) {
      return NextResponse.json({ success: false, message: "DurantoPay Withdraw Failed: " + (payoutResponse?.message || "Unknown error") }, { status: 500 });
    }
  
 // GameXA withdraw
    const gamexaResponse = await withdrawFromPlayer(user.gameXAPlayerId, Number(amount));

    if (!gamexaResponse?.success) {
      console.error("GameXA Withdraw Failed:", gamexaResponse?.message);
      return NextResponse.json({ success: false, message: "GameXA Withdraw Failed: " + gamexaResponse?.message }, { status: 500 });
    }

    // DB update
    await db.durantoPayWithdraw.create({
      data: {
        invoice_no,
        dp_transaction_id: payoutResponse.data?.dp_transaction_id || payoutResponse.dp_transaction_id || "",
        amount: new Prisma.Decimal(amount),
        pay_type: ps,
        wallet_number: account_number,
        status: "PENDING",
        user: { connect: { id: user.id } },
      },
    });

    await db.wallet.update({ where: { userId: user.id }, data: { balance: { decrement: amount } } });

    await createNotification({
      title: "Withdraw Initiated",
      description: `Your withdraw of ${amount} BDT has been initiated.`,
      userId: user.id,
      icon: "MONEY",
    });

    return NextResponse.json({
      success: true,
      payload: {
        dp_transaction_id: payoutResponse.data?.dp_transaction_id || payoutResponse.dp_transaction_id || "",
        gamexa_status: gamexaResponse.status,
        invoice_no,
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Withdraw error:", error);
    return NextResponse.json({ success: false, message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
