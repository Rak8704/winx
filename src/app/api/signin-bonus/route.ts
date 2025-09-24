/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const user: any = await findCurrentUser();

    const claimedSigninRewards = await db.claimedSigninReward.findMany({
      where: { userId: user!.id },
      include: {
        reward: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalSigninIncome = claimedSigninRewards.reduce(
      (acc, claimedSigninReward) => {
        if (claimedSigninReward.isClamed) {
          return acc + claimedSigninReward.reward.prize;
        }
        return acc;
      },
      0
    );

    const lastSignin = claimedSigninRewards.find(
      (claimedSigninReward) => claimedSigninReward.isClamed
    );

    const rewards: any = await db.signinBonusRewards.findMany({ where: {} });

    const deposits = await db.deposit.findMany({
      where: { status: "APPROVED" },
      include: { ClaimedSigninReward: true },
    });

    rewards.map((reward: any) => {
      const id = reward.id;

      const alreadyClaimed = claimedSigninRewards.find(
        (claimedSigninReward) =>
          claimedSigninReward.reward.id == id && claimedSigninReward.isClamed
      );

      if (alreadyClaimed) {
        reward.status = "CLAIMED";
        return reward;
      }

      const readyToClaim = deposits.find((deposit) => {
        if (!deposit.ClaimedSigninReward) {
          return false;
        } else {
          return deposit.ClaimedSigninReward.rewardId == id;
        }
      });

      if (readyToClaim) {
        reward.status = "CLAIM";
        return reward;
      }

      reward.status = "AVAILABLE";
      return reward;
    });

    const nextClaimAvailable = rewards.find((reward: any) => {
      if (claimedSigninRewards.length == 0) {
        return true;
      } else {
        const unclaimed = claimedSigninRewards.find(
          (claimedSigninReward) => claimedSigninReward.reward.id !== reward.id
        );
        return !!unclaimed;
      }
    });

    return Response.json({
      statictic: {
        totalSigninIncome,
        lastSigninIncome: lastSignin?.reward.prize || 0,
      },
      lastClaimed: lastSignin,
      nextClaimAvailable,
      rewards: rewards,
    });
  } catch (error) {
    console.log({ error });
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
