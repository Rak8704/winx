/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { cardNumberGenerate } from "@/lib/helpers";
import { CreateNewCardInput } from "@/types/api/card";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const user = await findCurrentUser();
    if (!user)
      return Response.json({ error: "Refresh the page" }, { status: 401 });

    const { paymentWalletId, password, walletNumber, ownerName } =
      (await req.json()) as CreateNewCardInput;

    if (!paymentWalletId || !password || !walletNumber || !ownerName)
      return Response.json(
        {
          error: "Invalid Input",
        },
        { status: 400 }
      );

    const container = await db.cardContainer.findFirst({
      where: { userId: user.id },
    });

    if (container)
      return Response.json({
        message: "Please Make new card on Existing Container",
      });

    const existingCardWithNumber = await db.card.findFirst({
      where: { walletNumber },
    });

    if (existingCardWithNumber)
      return Response.json(
        {
          error: "Card is avialiable! Try with another Number",
        },
        { status: 400 }
      );

    const hasdPassword = await bcrypt.hash(password, 20);
    const cardNumber = await cardNumberGenerate();
    const cardContainer = await db.cardContainer.create({
      data: {
        ownerName,
        password: hasdPassword,
        cards: {
          create: [
            {
              cardNumber,
              walletNumber,
              paymentWalletid: paymentWalletId,
            },
          ],
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const card: any = await db.card.findFirst({
      where: { containerId: cardContainer.id, walletNumber },
      include: { container: true },
    });

    const paymentWallet = await db.paymentWallet.findUnique({
      where: { id: card.paymentWalletid },
    });
    console.log({ card });
    console.log({ paymentWallet });
    console.log("card.paymentWalletid ", card.paymentWalletid);

    card.paymentWallet = paymentWallet;
    return Response.json(
      { message: "New card created", card: card },
      { status: 201 }
    );
  } catch (error) {
    console.log("careate new card error ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
