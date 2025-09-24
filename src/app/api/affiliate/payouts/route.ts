import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

// Schema for payout request
const payoutRequestSchema = z.object({
  amount: z.number().min(50, "Minimum payout amount is $50"),
  paymentMethod: z.enum(["BANK_TRANSFER", "PAYPAL", "CRYPTO", "MOBILE_MONEY"]),
  paymentDetails: z.object({
    accountNumber: z.string().optional(),
    accountName: z.string().optional(),
    bankName: z.string().optional(),
    email: z.string().email().optional(),
    walletAddress: z.string().optional(),
    phoneNumber: z.string().optional(),
  })
});

// GET - Get affiliate payouts history
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    // For now, return mock payout data
    const mockPayouts = {
      payouts: [
        {
          id: "payout_1",
          amount: 500.00,
          paymentMethod: "BANK_TRANSFER",
          paymentDetails: {
            accountNumber: "****1234",
            accountName: "John Doe",
            bankName: "ABC Bank"
          },
          status: "COMPLETED",
          requestedAt: "2024-01-20T10:00:00Z",
          processedAt: "2024-01-22T14:30:00Z",
          transactionId: "TXN123456789"
        },
        {
          id: "payout_2",
          amount: 250.00,
          paymentMethod: "PAYPAL",
          paymentDetails: {
            email: "john.doe@example.com"
          },
          status: "PENDING",
          requestedAt: "2024-01-25T15:30:00Z",
          processedAt: null,
          transactionId: null
        },
        {
          id: "payout_3",
          amount: 150.00,
          paymentMethod: "MOBILE_MONEY",
          paymentDetails: {
            phoneNumber: "+1234567890"
          },
          status: "PROCESSING",
          requestedAt: "2024-01-28T09:15:00Z",
          processedAt: null,
          transactionId: null
        }
      ],
      summary: {
        totalRequested: 900.00,
        totalPaid: 500.00,
        totalPending: 400.00,
        availableBalance: 320.50
      },
      pagination: {
        currentPage: page,
        totalPages: 1,
        totalCount: 3,
        hasNext: false,
        hasPrev: false
      }
    };

    return NextResponse.json({
      success: true,
      data: mockPayouts
    });

    /* TODO: Uncomment this once database migration is complete
    // Check if user is an affiliate
    const affiliate = await db.affiliate.findUnique({
      where: { userId: session.user.id }
    });

    if (!affiliate) {
      return NextResponse.json({ 
        error: "User is not an affiliate" 
      }, { status: 404 });
    }

    // Build where clause
    const whereClause: any = {
      affiliateId: affiliate.id
    };

    if (status) {
      whereClause.status = status;
    }

    // Get total count
    const totalCount = await db.affiliatePayout.count({
      where: whereClause
    });

    // Get payouts with pagination
    const payouts = await db.affiliatePayout.findMany({
      where: whereClause,
      orderBy: { requestedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    // Calculate summary
    const allPayouts = await db.affiliatePayout.findMany({
      where: { affiliateId: affiliate.id },
      select: {
        amount: true,
        status: true
      }
    });

    const summary = allPayouts.reduce((acc, payout) => {
      const amount = Number(payout.amount);
      acc.totalRequested += amount;
      
      if (payout.status === 'COMPLETED') {
        acc.totalPaid += amount;
      } else if (payout.status === 'PENDING' || payout.status === 'PROCESSING') {
        acc.totalPending += amount;
      }
      
      return acc;
    }, {
      totalRequested: 0,
      totalPaid: 0,
      totalPending: 0,
      availableBalance: Number(affiliate.totalEarnings) - Number(affiliate.pendingEarnings)
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        payouts: payouts.map(payout => ({
          id: payout.id,
          amount: Number(payout.amount),
          paymentMethod: payout.paymentMethod,
          paymentDetails: payout.paymentDetails,
          status: payout.status,
          requestedAt: payout.requestedAt,
          processedAt: payout.processedAt,
          transactionId: payout.transactionId
        })),
        summary,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
    */

  } catch (error) {
    console.error("[AFFILIATE_PAYOUTS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Request new payout
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    payoutRequestSchema.parse(body);

    // For now, return mock response
    return NextResponse.json({
      success: true,
      message: "Payout request submitted successfully",
      payoutId: `payout_${Date.now()}`,
      estimatedProcessingTime: "2-3 business days"
    });

    /* TODO: Uncomment this once database migration is complete
    // Check if user is an affiliate
    const affiliate = await db.affiliate.findUnique({
      where: { userId: session.user.id }
    });

    if (!affiliate) {
      return NextResponse.json({ 
        error: "User is not an affiliate" 
      }, { status: 404 });
    }

    // Check if affiliate has sufficient balance
    const availableBalance = Number(affiliate.totalEarnings) - Number(affiliate.pendingEarnings);
    
    if (validatedData.amount > availableBalance) {
      return NextResponse.json({
        error: "Insufficient balance",
        availableBalance,
        requestedAmount: validatedData.amount
      }, { status: 400 });
    }

    // Check for pending payouts (limit one pending payout at a time)
    const pendingPayout = await db.affiliatePayout.findFirst({
      where: {
        affiliateId: affiliate.id,
        status: { in: ['PENDING', 'PROCESSING'] }
      }
    });

    if (pendingPayout) {
      return NextResponse.json({
        error: "You already have a pending payout request",
        pendingPayoutId: pendingPayout.id
      }, { status: 400 });
    }

    // Create payout request
    const payout = await db.affiliatePayout.create({
      data: {
        affiliateId: affiliate.id,
        amount: validatedData.amount,
        paymentMethod: validatedData.paymentMethod,
        paymentDetails: validatedData.paymentDetails,
        status: 'PENDING'
      }
    });

    // Update affiliate pending earnings
    await db.affiliate.update({
      where: { id: affiliate.id },
      data: {
        pendingEarnings: { increment: validatedData.amount }
      }
    });

    return NextResponse.json({
      success: true,
      message: "Payout request submitted successfully",
      payoutId: payout.id,
      estimatedProcessingTime: "2-3 business days"
    });
    */

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("[AFFILIATE_PAYOUTS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}