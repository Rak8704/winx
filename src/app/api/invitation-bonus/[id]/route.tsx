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

    const user = await findCurrentUser();

    if (!user)
      return Response.json({ error: "Refresh the page" }, { status: 401 });

    const reward = await db.invitationRewareds.findUnique({ where: { id } });

    if (!reward) return Response.json({ error: "Reward is not available yet" });

    const isClamed = !!(await db.claimedInvitationReward.findFirst({
      where: { rewardId: id },
    }));

    if (isClamed)
      return Response.json(
        { error: "You already clamed this reward" },
        { status: 400 }
      );

    const userInvitationBonus = await db.invitationBonus.findUnique({
      where: { userId: user.id },
    });

    if (userInvitationBonus?.totalValidreferral !== reward.targetReferral) {
      return Response.json(
        { error: "Please refer more users to get it" },
        { status: 400 }
      );
    }

    await db.$transaction([
      db.wallet.update({
        where: { userId: user.id },
        data: { balance: { increment: reward.prize } },
      }),
      db.invitationBonus.update({
        where: { id: userInvitationBonus!.id },
        data: {
          claimedRewards: {
            create: {
              reward: {
                connect: {
                  id: reward.id,
                },
              },
            },
          },
        },
      }),
    ]);

    await createNotification({
      title: `Bonus Added`,
      description: `${reward.prize} BDT added to your account`,
      userId: user!.id!,
      icon: "MONEY",
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("CLAME INVITATION REWARD: ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
