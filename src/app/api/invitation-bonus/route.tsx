import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const user = await findCurrentUser();

    if (!user)
      return Response.json({ error: "Refresh the page" }, { status: 401 });

    const userInvitationBonus = await db.invitationBonus.findUnique({
      where: { userId: user.id },
      include: { claimedRewards: true },
    });

    const rewards = await db.invitationRewareds.findMany({ where: {} });

    const userRewards = rewards.map((reward) => {
      const newReward = { ...reward, completedReferral: 0, isClamed: false };

      newReward.completedReferral =
        userInvitationBonus!.totalValidreferral >= reward.targetReferral
          ? reward.targetReferral
          : userInvitationBonus!.totalValidreferral;

      newReward.isClamed = !!userInvitationBonus!.claimedRewards.find(
        (clamedReward) => reward.id === clamedReward.rewardId
      );

      return newReward;
    });

    const invitationBonus = await db.invitationBonus.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        claimedRewards: {
          include: {
            reward: true,
          },
        },
      },
    });

    const totalIncome = invitationBonus?.claimedRewards.reduce(
      (acc, claimedReward) => {
        return acc + +claimedReward.reward.prize;
      },
      0
    );

    const totalIncomeToday = invitationBonus?.claimedRewards.reduce(
      (acc, claimedReward) => {
        const createdAt = new Date(claimedReward.createdAt);
        const now = new Date();

        const isWithin24Hours =
          now.getTime() - createdAt.getTime() <= 24 * 60 * 60 * 1000;

        if (isWithin24Hours) {
          return acc + +claimedReward.reward.prize;
        }

        return acc;
      },
      0
    );

    const statictic = {
      registersCount: userInvitationBonus!.totalRegisters,
      todayIncome: totalIncomeToday,
      validReferral: userInvitationBonus!.totalValidreferral,
      totalIncome,
    };

    return Response.json({ rewards: userRewards, statictic }, { status: 200 });
  } catch (error) {
    console.log("Invitation Bonus = ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
