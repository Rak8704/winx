// src/app/api/deposit/callback/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { db } from "@/lib/db";
import { GAMEXA_HEADERS, GAMEXA_CONFIG } from "@/lib/constants/gamexa";
import { createNotification } from "@/action/notifications";
import { convertBDTToIDR } from "@/lib/utils/currency";

export async function POST(req: Request) {
  try {
    const { invoice_no, status, amount } = await req.json();

    // Find the deposit record to get user information
    const depositRecord = await db.durantoPayDeposit.findUnique({
      where: { invoice_no },
      include: { user: true }
    });

    if (!depositRecord) {
      return NextResponse.json({ message: "Deposit record not found" }, { status: 404 });
    }

    if (status !== "success") {
      await db.durantoPayDeposit.update({
        where: { invoice_no },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ message: "Transaction failed" });
    }

    // Check if user has GameXA player ID
    if (!depositRecord.user.gameXAPlayerId) {
      console.log("User doesn't have GameXA player ID, skipping GameXA deposit");
      await db.durantoPayDeposit.update({
        where: { invoice_no },
        data: { status: "COMPLETED" },
      });
      return NextResponse.json({ message: "Deposit completed (no GameXA player)" });
    }

    // GameXA deposit
    const tokenResp = await axios.post(
      `${GAMEXA_CONFIG.BASE_URL}/api/auth/login`,
      { agent_code: GAMEXA_CONFIG.AGENT_CODE, password: GAMEXA_CONFIG.PASSWORD },
      { headers: GAMEXA_HEADERS }
    );
    const token = tokenResp.data.token;

    await axios.post(
      `${GAMEXA_CONFIG.BASE_URL}/api/players/${depositRecord.user.gameXAPlayerId}/deposit`,
      { amount: convertBDTToIDR(Number(amount)), reference_id: invoice_no },
      { headers: { ...GAMEXA_HEADERS, Authorization: `Bearer ${token}` } }
    );

    await db.durantoPayDeposit.update({
       where: { invoice_no },
       data: { status: "COMPLETED" },
     });

    await createNotification({
      title: "Deposit Successful",
      description: `Your deposit of ${amount} BDT has been added.`,
      userId: depositRecord.user.id,
      icon: "MONEY",
    });

    return NextResponse.json({ message: "Deposit successful" });

  } catch (err: any) {
    console.error("Deposit callback error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
