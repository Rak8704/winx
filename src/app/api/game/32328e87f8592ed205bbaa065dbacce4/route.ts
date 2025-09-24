/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { Decimal } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { reduceTurnOver } from "@/lib/turnover";

function parseDecimal(value: any): Decimal | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const num = new Decimal(value);
  return num.isNaN() ? undefined : num;
}

function parseNumber(value: any): number | undefined {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? undefined : parsed;
}

function parseDate(value: any): Date | undefined {
  const date = new Date(value);
  return isNaN(date.getTime()) ? undefined : date;
}

type GetBalanceType = {
  cmd: string;
  hall: number;
  key: string;
  login: string;
};

type WriteBetType = {
  cmd: string;
  login: string;
  hall: number;
  key: string;
  sessionId?: number;
  bet?: Decimal;
  win?: Decimal;
  tradeId?: string;
  action?: string;
  betInfo?: string;
  gameId?: number;
  matrix?: string;
  date?: Date;
  WinLines?: string;
};

type RequestType = GetBalanceType & WriteBetType;

export const POST = async (req: NextRequest) => {
  try {
    const rawBody = (await req.json()) as RequestType;

    const requestBody: RequestType = {
      ...rawBody,
      hall: parseNumber(rawBody.hall)!,
      sessionId: parseNumber(rawBody.sessionId),
      gameId: parseNumber(rawBody.gameId),
      bet: parseDecimal(rawBody.bet),
      win: parseDecimal(rawBody.win),
      date: parseDate(rawBody.date),
    };

    if (requestBody.cmd !== "getBalance" && requestBody.cmd !== "writeBet") {
      return new Response(
        JSON.stringify({ success: "fail", error: "cmd_not_found" }),
        { status: 403 }
      );
    }

    if (
      ![+process.env.HALL_ID!, +process.env.HALL_ID_TBS!].includes(
        requestBody.hall
      )
    ) {
      return new Response(
        JSON.stringify({ status: "fail", error: "hall_id_not_found" }),
        { status: 403 }
      );
    }

    if (requestBody.key != process.env.HALL_KEY) {
      return new Response(
        JSON.stringify({ success: "fail", error: "hall_key_invalid" }),
        { status: 403 }
      );
    }

    const user = await db.user.findFirst({
      where: { playerId: requestBody.login },
      include: { wallet: true },
    });
    if (!user) {
      return new Response(
        JSON.stringify({ success: "fail", error: "user_not_found" }),
        { status: 200 }
      );
    }

    let userBalance = user.wallet?.balance || new Decimal(0);

    if (requestBody.cmd === "getBalance") {
      return Response.json({
        status: "success",
        error: "",
        login: `${user.playerId}`,
        balance: `${user.wallet?.balance.toFixed(2) || 0.0}`,
        currency: user.wallet?.currency || "BDT",
      });
    }

    if (requestBody.cmd === "writeBet") {
      if (requestBody.bet && requestBody.bet > userBalance) {
        return new Response(
          JSON.stringify({ success: "fail", error: "fail_balance" }),
          { status: 403 }
        );
      }
      const betRecord: Prisma.BettingRecordUpdateInput = {};
      if (requestBody.bet) {
        userBalance = userBalance.sub(requestBody.bet);
        await reduceTurnOver(+requestBody.bet, user!.id);
        betRecord.totalBet = {
          increment: requestBody.bet,
        };
      }
      if (requestBody.win) {
        userBalance = userBalance.add(requestBody.win);
        betRecord.totalWin = {
          increment: requestBody.win,
        };
      }

      await db.user.update({
        where: { id: user!.id },
        data: {
          wallet: { update: { balance: userBalance } },
          bettingRecord: { update: { ...betRecord } },
        },
      });

      return Response.json({
        status: "success",
        error: "",
        login: `${user.playerId}`,
        balance: `${userBalance.toFixed(2)}`,
        currency: user.wallet?.currency || "BDT",
      });
    }
  } catch (error: any) {
    console.log({ error });
    return Response.json(
      { success: "fail", error: error.message || "unexpected_error" },
      { status: 500 }
    );
  }
};
