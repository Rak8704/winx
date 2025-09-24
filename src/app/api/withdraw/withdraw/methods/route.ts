import { findCurrentUser } from "@/data/user";
import { NextResponse } from "next/server";
import { getAvailablePaymentSystems } from "@/lib/api/durantoPayApi";
import { getPaymentMethodImage, getPaymentMethodLabel } from "@/lib/utils/paymentMethodUtils";

export async function GET() {
  try {
    const user = await findCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    // Get available payment systems from DurantoPay
    const paymentSystemsResponse = await getAvailablePaymentSystems();
    
    if (!paymentSystemsResponse.status) {
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
        min_withdrawals: 100, // Default values, should be configurable
        max_withdrawals: 50000, // Default values, should be configurable
        instructions: `Please use your ${method} account to receive the payment`,
        warning: `Make sure to use an account registered under your name`,
        isActive: true,
      };
    });

    return NextResponse.json({
      payload: {
        wallets,
      }
    });
  } catch (error) {
    console.error("Withdraw payment methods error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}