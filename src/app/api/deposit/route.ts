// src/app/api/deposit/route.ts
import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { createPayment, generateInvoiceNumber } from "@/lib/api/durantoPayApi";

export const POST = async (req: NextRequest) => {
  try {
    const { amount, ps } = await req.json();
    console.log("Deposit request received:", { amount, ps });

    if (!amount || !ps) {
      return NextResponse.json({ success: false, message: "Missing required fields: amount and ps are required" }, { status: 400 });
    }

    const user: any = await findCurrentUser();
    if (!user) {
      console.log("Authentication failed - no user found");
      return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 401 });
    }

    console.log("User found:", { id: user.id, gameXAPlayerId: user.gameXAPlayerId });

    const invoice_no = generateInvoiceNumber();

    // 1️⃣ Create Durantopay payment
    console.log("Creating Durantopay payment with:", { invoice_no, paymentType: ps, amount });
    let paymentResponse;
    try {
      paymentResponse = await createPayment({ invoice_no, paymentType: ps, amount: amount.toString() });
      console.log("Durantopay payment response:", paymentResponse);
    } catch (apiError: any) {
      console.error("Durantopay API call failed:", apiError);
      return NextResponse.json({ success: false, message: `Payment service error: ${apiError.message}` }, { status: 500 });
    }

    if (!paymentResponse || paymentResponse.status !== 0) {
      return NextResponse.json({ success: false, message: "Deposit Failed: " + (paymentResponse?.message || "Payment service error") }, { status: 500 });
    }

    // 2️⃣ Save pending deposit
    console.log("Saving deposit record to database...");
    await db.durantoPayDeposit.create({
      data: {
        invoice_no,
        dp_transaction_id: String(paymentResponse.data?.dp_transaction_id || paymentResponse.dp_transaction_id || ""),
        amount: new Prisma.Decimal(amount),
        paymentType: ps,
        status: "PENDING",
        user: { connect: { id: user.id } },
      },
    });
    console.log("Deposit record saved successfully");

    // 3️⃣ Return payment URL for frontend
    const paymentUrl =
      paymentResponse.data?.payment_url ||
      paymentResponse.data?.paymentUrl ||
      paymentResponse.payment_url ||
      null;

    const transactionId = String(paymentResponse.data?.dp_transaction_id || paymentResponse.dp_transaction_id || "");
    const transactionStatus = paymentResponse.data?.transaction_status || paymentResponse.data?.status || paymentResponse.transaction_status || "unverified";

    if (!paymentUrl) {
      console.error("No payment URL found. Full response:", paymentResponse);
      return NextResponse.json({
        success: false,
        message: "Payment request created but payment URL is not available. Contact support.",
        debug: {
          hasData: !!paymentResponse.data,
          dataKeys: paymentResponse.data ? Object.keys(paymentResponse.data) : [],
          responseKeys: Object.keys(paymentResponse),
        },
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      payload: { dp_transaction_id: transactionId, payment_url: paymentUrl, transaction_status: transactionStatus, invoice_no },
    }, { status: 200 });

  } catch (error: any) {
    console.error("Deposit error:", error);
    return NextResponse.json({ message: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
