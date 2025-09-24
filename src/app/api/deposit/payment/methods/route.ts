import { findCurrentUser } from "@/data/user";
import { NextResponse } from "next/server";
import { getAvailablePaymentSystems } from "@/lib/api/durantoPayApi";
import { db } from "@/lib/db";
import { getPaymentMethodImage, getPaymentMethodLabel } from "@/lib/utils/paymentMethodUtils";

export async function GET() {
  try {
    const user = await findCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    // Get available payment systems from DurantoPay
    const paymentSystemsResponse = await getAvailablePaymentSystems();
    
    console.log("Payment systems response:", paymentSystemsResponse);
    
    if (!paymentSystemsResponse.status) {
      console.error("Failed to fetch payment methods from Durantopay API");
      return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 });
    }

    // Transform the response to match the existing format
    // The DurantoPay API returns an array of payment method names
    const paymentMethods = paymentSystemsResponse.data || [];
    const wallets = paymentMethods.map((method: string) => {
      return {
        id: method,
        name: method,
        image: getPaymentMethodImage(method),
        label: getPaymentMethodLabel(method),
        min_deposit: 100, // Default values, should be configurable
        max_deposit: 50000, // Default values, should be configurable
        instructions: `Please use your ${method} account to make the payment`,
        warning: `Make sure to use an account registered under your name`,
        isActive: true,
      };
    });

    // Get bonus settings from database with error handling
    let bonus = {
      signinBonus: 5,
      referralBonus: 5,
    };
    
    try {
      const bonusSettings = await db.bonus.findFirst();
      if (bonusSettings) {
        bonus = {
          signinBonus: bonusSettings?.signinBonus || 5,
          referralBonus: bonusSettings?.referralBonus || 5,
        };
      }
    } catch (dbError) {
      console.error("Error fetching bonus settings:", dbError);
      // Use default values if database query fails
    }

    return NextResponse.json({
      payload: {
        wallets,
        bonus,
      }
    });
  } catch (error) {
    console.error("Deposit payment methods error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}