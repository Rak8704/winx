/* eslint-disable @typescript-eslint/no-explicit-any */
import { createNotification } from "@/action/notifications";
import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const user: any = await findCurrentUser();

    const reward = await db.signinBonusRewards.findUnique({
      where: { id },
    });

    if (!reward)
      return Response.json({ error: "Reward not found" }, { status: 404 });

    const deposit = await db.deposit.findFirst({
      where: {
        AND: [
          {
            userId: user!.id,
          },
          {
            ClaimedSigninReward: {
              rewardId: reward.id,
            },
          },
        ],
      },
      include: {
        ClaimedSigninReward: { include: { reward: true } },
      },
    });

    if (!deposit) {
      return Response.json(
        { error: "Please Deposit First and Complete the daily mission" },
        { status: 400 }
      );
    }

    if (deposit.ClaimedSigninReward?.isClamed) {
      return Response.json(
        { error: "You already have the reward" },
        { status: 400 }
      );
    }

    await db.wallet.update({
      where: {
        userId: user.id,
      },
      data: {
        balance: {
          increment: reward.prize,
        },
      },
    });

    await db.deposit.update({
      where: {
        id: deposit.id,
      },
      data: {
        ClaimedSigninReward: {
          update: {
            isClamed: true,
          },
        },
      },
    });

    await createNotification({
      title: `Bonus Added`,
      description: `${reward.prize} BDT added to your account`,
      userId: user!.id!,
      icon: "MONEY",
    });
    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
