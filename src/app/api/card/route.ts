/* eslint-disable @typescript-eslint/no-explicit-any */
import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { cardNumberGenerate } from "@/lib/helpers";
import { CreateCardInput } from "@/types/api/card";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    console.log("CARD CALLED");

    const user = await findCurrentUser();
    if (!user)
      return Response.json({ error: "Refresh the page" }, { status: 401 });

    const { walletNumber, paymentWalletId, password } =
      (await req.json()) as CreateCardInput;

    if (!walletNumber || !paymentWalletId || !password)
      return Response.json(
        {
          error: "Invalid Input",
        },
        { status: 400 }
      );
    const cardContainer = await db.cardContainer.findFirst({
      where: { userId: user.id },
      include: { cards: true },
    });

    if (!cardContainer)
      return Response.json(
        {
          error: "Please create a new Card with Payeer name",
        },
        { status: 400 }
      );

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

    const isPasswordMatch = await bcrypt.compare(
      password,
      cardContainer.password
    );

    if (!isPasswordMatch)
      return Response.json(
        {
          error: "Invalid Password",
        },
        { status: 400 }
      );

    const limit = cardContainer.cards.length;
    if (limit > 4) {
      return Response.json({ error: "Card limit reached " }, { status: 400 });
    }

    const cardNumber = await cardNumberGenerate();

    const card: any = await db.card.create({
      data: {
        walletNumber,
        paymentWalletid: paymentWalletId,
        cardNumber,
        container: {
          connect: {
            id: cardContainer.id,
          },
        },
      },
      include: { container: true },
    });
    console.log("card.paymentWalletId ", card.paymentWalletId);
    const paymentWallet = await db.paymentWallet.findFirst({
      where: { id: card.paymentWalletid },
    });
    card.paymentWallet = paymentWallet;

    return Response.json(
      { message: "New card created", card: card },
      { status: 201 }
    );
  } catch (error) {
    console.log("CREATE CARD ERROR ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const allFind = new URL(req.url).searchParams.get("all") || "true";

    const user = await findCurrentUser();
    if (!user)
      return Response.json({ error: "Refresh the page" }, { status: 401 });

    const cardContainer = await db.cardContainer.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (!cardContainer) {
      return Response.json({ cards: [] }, { status: 200 });
    }
    const findQuery: Prisma.CardWhereInput = { containerId: cardContainer?.id };

    if (!JSON.parse(allFind)) {
      findQuery.isActive = true;
    }
    const cards: any = await db.card.findMany({
      where: findQuery,
      orderBy: { createdAt: "asc" },
      include: { container: true },
    });

    const cardsWithWalletPromise = cards.map(async (card: any) => {
      const paymentWallet = await db.paymentWallet.findUnique({
        where: { id: card.paymentWalletid },
      });
      card.paymentWallet = paymentWallet;
      return card;
    });

    const cardsWithWallet = await Promise.all(cardsWithWalletPromise);

    return Response.json({ cards: cardsWithWallet }, { status: 200 });
  } catch (error) {
    console.log("CARD FETCH ERROR : ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
