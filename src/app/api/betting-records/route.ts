import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { findCurrentUser } from "@/data/user";

export async function GET() {
  const user = await findCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Fetch the single betting record for the user
    const record = await db.bettingRecord.findUnique({
      where: { id: user.id },
    });

    if (!record) {
      return NextResponse.json({
        totalBet: 0,
        totalWin: 0,
        winningRate: 0,
      });
    }

    const winningRate =
      +record.totalBet > 0 ? (+record.totalWin / +record.totalBet) * 100 : 0;

    return NextResponse.json({
      totalBet: record.totalBet,
      totalWin: record.totalWin,
      winningRate,
    });
  } catch (error) {
    console.error("Error fetching betting record:", error);
    return NextResponse.json(
      { error: "Failed to fetch betting record" },
      { status: 500 }
    );
  }
}
