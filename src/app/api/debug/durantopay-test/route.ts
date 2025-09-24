import { NextResponse } from "next/server";
import { getAvailablePaymentSystems } from "@/lib/api/durantoPayApi";

export async function GET() {
  try {
    console.log("Testing Durantopay API connection...");
    
    // Test the API connection
    const paymentSystemsResponse = await getAvailablePaymentSystems();
    
    console.log("Payment systems response:", paymentSystemsResponse);
    
    return NextResponse.json({
      success: true,
      data: paymentSystemsResponse
    });
  } catch (error) {
    console.error("Durantopay API test error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}