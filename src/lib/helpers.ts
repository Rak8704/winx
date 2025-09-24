import { findUserByPlayerId } from "@/data/user";
import { db } from "./db";

export const playerIdGenerate = async () => {
  let id = "";
  let hasUser = true;
  while (hasUser) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    id = ((array[0] % 9000000000) + 1000000000).toString();

    const alreadyExist = await findUserByPlayerId(id);

    if (!alreadyExist) {
      hasUser = false;
    }
  }

  return id;
};

export const referIdGenerate = async () => {
  let referralId = "";
  let hasUser = true;
  while (hasUser) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      referralId += chars[randomIndex];
    }
    const alreadyExist = await findUserByPlayerId(referralId);

    if (!alreadyExist) {
      hasUser = false;
    }
  }

  return referralId;
};

export const trackingNumberGenerate = async () => {
  let trackingNumber = "";
  let hasUser = true;
  while (hasUser) {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14); // e.g., 20250414162400
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();

    trackingNumber = `${timestamp}-${randomPart}`;
    const alreadyExist = await db.deposit.findUnique({
      where: { trackingNumber: trackingNumber },
    });

    if (!alreadyExist) {
      hasUser = false;
    }
  }

  return trackingNumber;
};

export const cardNumberGenerate = async () => {
  let cardNumber = "";
  let hasUser = true;
  while (hasUser) {
    for (let i = 0; i < 15; i++) {
      cardNumber += Math.floor(Math.random() * 10);
    }

    const alreadyExist = await db.card.findFirst({
      where: { cardNumber: cardNumber },
    });

    if (!alreadyExist) {
      hasUser = false;
    }
  }

  return cardNumber;
};
