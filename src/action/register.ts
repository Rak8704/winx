"use server";
import zod from "zod";
import { registerSchema } from "@/schema";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { findUserByPhone, findUserByReferId } from "@/data/user";
import { referIdGenerate } from "@/lib/helpers";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { LOGIN_SUCCESS } from "@/success";
import { createPlayer } from "@/lib/api/gamexaApi";

export const register = async (data: zod.infer<typeof registerSchema>) => {
  try {
    const { password, confirmPassword, phone, ageCheck, bonusCheck, referralId } = data;

    // ---------------- Validations ----------------
    if (password !== confirmPassword) return { error: "Confirm Password did not match" };
    if (!ageCheck) return { error: "Read Out age Restrictions" };

    const existingUser = await findUserByPhone(phone);
    if (existingUser) return { error: "Number is already registered" };

    // ---------------- Referral Setup ----------------
    let invitedBy = {};
    let isReferralBonusActive = false;

    const referralUser = referralId ? await findUserByReferId(referralId) : null;
    if (referralUser) {
      await db.invitationBonus.update({
        where: { userId: referralUser.id },
        data: { totalRegisters: { increment: 1 } },
      });

      isReferralBonusActive = true;
      invitedBy = {
        create: { user: { connect: { id: referralUser.id } } },
      };
    }

    // ---------------- Hash Password + Generate referId ----------------
    const hashedPassword = await bcrypt.hash(password, 10);
    const referId = await referIdGenerate();

    // ---------------- GameXA Player Creation ----------------
    let gameXAPlayerId: string | null = null;
    try {
      const playerResponse = await createPlayer({
        username: phone,
        email: `${phone}@winxebet.com`,
        full_name: `Guest ${Date.now()}`,
        phone,
        currency: "IDR",
        password,
      });

      console.log("Full GameXA player response:", JSON.stringify(playerResponse, null, 2));

      // Extract player ID based on GameXA API documentation
      // GameXA returns: { "message": "Player created successfully", "player": { "id": 1, ... } }
      gameXAPlayerId =
         playerResponse?.player?.id?.toString() ||
         playerResponse?.id?.toString() ||
         playerResponse?.player_id?.toString() ||
         playerResponse?.data?.player?.id?.toString() ||
         playerResponse?.data?.id?.toString() ||
         playerResponse?.data?.player_id?.toString();

      if (!gameXAPlayerId) {
        console.error("GameXA Player ID extraction failed. Response structure:", {
          hasPlayerId: !!playerResponse?.player_id,
          hasPlayerObject: !!playerResponse?.player,
          hasId: !!playerResponse?.id,
          hasData: !!playerResponse?.data,
          hasResult: !!playerResponse?.result,
          responseKeys: Object.keys(playerResponse || {}),
          dataKeys: playerResponse?.data ? Object.keys(playerResponse.data) : null
        });
        throw new Error(`Failed to get GameXA playerId. Response: ${JSON.stringify(playerResponse)}`);
      }
      
      console.log("GameXA player created successfully:", gameXAPlayerId);
    } catch (err: unknown) {
      const error = err as Error & { response?: { data?: unknown; status?: number } };
      console.error("GameXA creation failed:", {
        error: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status
      });
      return { error: `Failed to create player in GameXA: ${error.message}. Registration aborted.` };
    }

    // ---------------- Create Player in DB ----------------
    const newPlayer = await db.player.create({
      data: {
        playerId: gameXAPlayerId,
        name: `Guest ${Date.now()}`,
        email: `${phone}@winxebet.com`,
      },
    });

    // ---------------- Create User + Wallet in DB ----------------
    const newUser = await db.user.create({
      data: {
        phone,
        email: `${phone}@winxebet.com`,
        password: hashedPassword,
        playerId: newPlayer.playerId,       // mapping GameXA playerId
        gameXAPlayerId: newPlayer.playerId,
        referId,
        isBanned: false,
        invitedBy,
        bettingRecord: { create: {} },
        wallet: {
          create: {
            balance: 0,
            signinBonus: bonusCheck,
            referralBonus: isReferralBonusActive,
            currency: "BDT",
            playerId: newPlayer.id,   // Fix: Use newPlayer.id (database ID) instead of newPlayer.playerId (GameXA ID)
          },
        },
        inviationBonus: { create: {} },
      },
    });

    // ---------------- Update Referral ----------------
    if (referralUser) {
      await db.invitation.update({
        where: { userId: referralUser.id },
        data: { referredUsers: { connect: { id: newUser.id } } },
      });
    }

    // ---------------- Auto Sign In ----------------
    try {
      await signIn("credentials", {
        phone: newUser.phone,
        password,
        redirect: false,
      });
    } catch (error) {
      console.error("SignIn Error:", error);
    }

    return { success: LOGIN_SUCCESS };
  } catch (error) {
    console.error("Register Error:", error);
    return { error: INTERNAL_SERVER_ERROR };
  }
};
