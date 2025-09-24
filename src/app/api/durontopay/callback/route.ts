// src/app/api/durontopay/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import * as crypto from "crypto";
import axios from "axios";
import { GAMEXA_CONFIG, GAMEXA_HEADERS } from "@/lib/constants/gamexa";
import { convertBDTToIDR } from "@/lib/utils/currency";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    console.log("Durantopay callback received:", data);

    // Validate required fields
    if (!data.dp_transaction_id || !data.invoice_no) {
      console.error("Invalid callback payload - missing required fields");
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const {
      dp_transaction_id,
      invoice_no,
      amount,
      status,
      paymentType,
      transaction_time,
    } = data;

    console.log(
      `Processing callback for invoice: ${invoice_no}, transaction: ${dp_transaction_id}, status: ${status}`
    );

    // Find the deposit record with user relation
    const depositRecord = await db.durantoPayDeposit.findUnique({
      where: { invoice_no },
      include: { user: true },
    });

    if (!depositRecord) {
      console.error(`Deposit record not found for invoice: ${invoice_no}`);
      return NextResponse.json({ message: "Deposit record not found" }, { status: 404 });
    }

    // Update the deposit record
    await db.durantoPayDeposit.update({
      where: { invoice_no },
      data: {
        status:
          status === "success"
            ? "COMPLETED"
            : status === "failed"
            ? "FAILED"
            : "PENDING",
        dp_transaction_id: dp_transaction_id,
      },
    });

    // If payment is successful, update user wallet
    if (status === "success") {
      console.log(`Payment successful for invoice: ${invoice_no}, updating user wallet`);

      // Update user wallet balance
      await db.wallet.update({
        where: { userId: depositRecord.userId },
        data: {
          balance: {
            increment: new Prisma.Decimal(depositRecord.amount.toString()),
          },
        },
      });

      // Create transaction record
      await db.transaction.create({
        data: {
          transactionId: crypto.randomUUID(),
          playerId: depositRecord.user.gameXAPlayerId || depositRecord.userId,
          amount: depositRecord.amount,
          status: "COMPLETED",
        },
      });

      console.log(`Wallet updated and transaction recorded for user: ${depositRecord.userId}`);

      // 1️⃣ GameXA deposit (convert BDT → IDR)
      try {
        const gameXAAmount = convertBDTToIDR(depositRecord.amount.toNumber());

        if (depositRecord.user.gameXAPlayerId) {
          await axios.post(
            `${GAMEXA_CONFIG.BASE_URL}/api/wallet/deposit`,
            {
              player_id: depositRecord.user.gameXAPlayerId,
              amount: gameXAAmount.toFixed(2),
            },
            { headers: GAMEXA_HEADERS }
          );
          console.log(`GameXA deposit successful for player: ${depositRecord.user.gameXAPlayerId}`);
        } else {
          console.warn(`No GameXA playerId found for user: ${depositRecord.userId}`);
        }
      } catch (err) {
        console.error("GameXA deposit error:", err);
      }
    }

    console.log(`Callback processed successfully for invoice: ${invoice_no}`);
    return NextResponse.json({ message: "Callback processed successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Callback processing error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};

// Also handle GET requests for testing
export const GET = async () => {
  return NextResponse.json({
    message: "Durantopay callback endpoint is working",
    status: "active",
  });
};
