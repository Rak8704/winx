import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

// Schema for referral tracking
const referralTrackingSchema = z.object({
  affiliateCode: z.string(),
  referredUserId: z.string().optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

// GET - Get affiliate referrals
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    // For now, return mock referral data
    const mockReferrals = {
      referrals: [
        {
          id: "ref_1",
          referredUser: {
            id: "user_1",
            name: "John Doe",
            phone: "+1234567890",
            createdAt: "2024-01-15T10:00:00Z"
          },
          status: "ACTIVE",
          firstDepositAmount: 500.00,
          firstDepositDate: "2024-01-16T14:30:00Z",
          totalDeposits: 2500.00,
          totalBets: 3200.00,
          totalCommissions: 125.00,
          isActive: true,
          createdAt: "2024-01-15T10:00:00Z"
        },
        {
          id: "ref_2",
          referredUser: {
            id: "user_2",
            name: "Jane Smith",
            phone: "+1234567891",
            createdAt: "2024-01-20T15:30:00Z"
          },
          status: "QUALIFIED",
          firstDepositAmount: 300.00,
          firstDepositDate: "2024-01-21T09:15:00Z",
          totalDeposits: 1800.00,
          totalBets: 2100.00,
          totalCommissions: 90.00,
          isActive: true,
          createdAt: "2024-01-20T15:30:00Z"
        },
        {
          id: "ref_3",
          referredUser: {
            id: "user_3",
            name: "Bob Johnson",
            phone: "+1234567892",
            createdAt: "2024-01-25T12:00:00Z"
          },
          status: "PENDING",
          firstDepositAmount: null,
          firstDepositDate: null,
          totalDeposits: 0,
          totalBets: 0,
          totalCommissions: 0,
          isActive: true,
          createdAt: "2024-01-25T12:00:00Z"
        }
      ],
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
      data: mockReferrals
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
    const totalCount = await db.affiliateReferral.count({
      where: whereClause
    });

    // Get referrals with pagination
    const referrals = await db.affiliateReferral.findMany({
      where: whereClause,
      include: {
        referredUser: {
          select: {
            id: true,
            name: true,
            phone: true,
            createdAt: true
          }
        },
        commissions: {
          select: {
            amount: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    });

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      success: true,
      data: {
        referrals: referrals.map(referral => ({
          id: referral.id,
          referredUser: referral.referredUser,
          status: referral.status,
          firstDepositAmount: referral.firstDepositAmount ? Number(referral.firstDepositAmount) : null,
          firstDepositDate: referral.firstDepositDate,
          totalDeposits: Number(referral.totalDeposits),
          totalBets: Number(referral.totalBets),
          totalCommissions: referral.commissions.reduce((sum, comm) => sum + Number(comm.amount), 0),
          isActive: referral.isActive,
          createdAt: referral.createdAt
        })),
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
    console.error("[AFFILIATE_REFERRALS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Track new referral click
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    referralTrackingSchema.parse(body);

    // For now, return mock response
    return NextResponse.json({
      success: true,
      message: "Referral click tracked successfully",
      clickId: `click_${Date.now()}`
    });

    /* TODO: Uncomment this once database migration is complete
    // Find affiliate by code
    const affiliate = await db.affiliate.findUnique({
      where: { 
        affiliateCode: validatedData.affiliateCode,
        isActive: true
      }
    });

    if (!affiliate) {
      return NextResponse.json({ 
        error: "Invalid affiliate code" 
      }, { status: 404 });
    }

    // Track the click
    const click = await db.affiliateClick.create({
      data: {
        affiliateId: affiliate.id,
        ipAddress: validatedData.ipAddress,
        userAgent: validatedData.userAgent,
        referredUserId: validatedData.referredUserId
      }
    });

    // If user is provided and not already a referral, create referral record
    if (validatedData.referredUserId) {
      const existingReferral = await db.affiliateReferral.findFirst({
        where: {
          affiliateId: affiliate.id,
          referredUserId: validatedData.referredUserId
        }
      });

      if (!existingReferral) {
        await db.affiliateReferral.create({
          data: {
            affiliateId: affiliate.id,
            referredUserId: validatedData.referredUserId,
            status: 'PENDING'
          }
        });

        // Update affiliate stats
        await db.affiliate.update({
          where: { id: affiliate.id },
          data: {
            totalReferrals: { increment: 1 }
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Referral click tracked successfully",
      clickId: click.id
    });
    */

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("[AFFILIATE_REFERRALS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}