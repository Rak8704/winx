import { NextResponse } from "next/server";
import { auth } from "@/auth";

// GET - Get affiliate analytics and statistics
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, return mock analytics data since database tables don't exist yet
    const mockAnalytics = {
      overview: {
        totalClicks: 245,
        totalReferrals: 18,
        activeReferrals: 12,
        conversionRate: 7.3,
        totalEarnings: 1250.75,
        pendingEarnings: 320.50,
        thisMonthEarnings: 485.25
      },
      chartData: {
        clicks: [
          { date: "2024-01-01", clicks: 12 },
          { date: "2024-01-02", clicks: 18 },
          { date: "2024-01-03", clicks: 25 },
          { date: "2024-01-04", clicks: 15 },
          { date: "2024-01-05", clicks: 22 },
          { date: "2024-01-06", clicks: 30 },
          { date: "2024-01-07", clicks: 28 }
        ],
        earnings: [
          { date: "2024-01-01", amount: 45.50 },
          { date: "2024-01-02", amount: 67.25 },
          { date: "2024-01-03", amount: 89.75 },
          { date: "2024-01-04", amount: 52.00 },
          { date: "2024-01-05", amount: 78.50 },
          { date: "2024-01-06", amount: 95.25 },
          { date: "2024-01-07", amount: 82.75 }
        ]
      },
      topReferrals: [
        {
          id: "1",
          name: "John Doe",
          phone: "+1234567890",
          totalDeposits: 2500.00,
          totalCommissions: 125.00,
          joinDate: "2024-01-15",
          status: "ACTIVE"
        },
        {
          id: "2", 
          name: "Jane Smith",
          phone: "+1234567891",
          totalDeposits: 1800.00,
          totalCommissions: 90.00,
          joinDate: "2024-01-20",
          status: "ACTIVE"
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: mockAnalytics
    });

    /* TODO: Uncomment this once database migration is complete
    // Check if user is an affiliate
    const affiliate = await db.affiliate.findUnique({
      where: { userId: session.user.id },
      include: {
        referrals: {
          include: {
            referredUser: {
              select: {
                id: true,
                name: true,
                phone: true,
                createdAt: true
              }
            },
            commissions: true
          },
          orderBy: { totalCommissions: 'desc' },
          take: 10
        },
        commissions: {
          where: {
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        clicks: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!affiliate) {
      return NextResponse.json({ 
        error: "User is not an affiliate" 
      }, { status: 404 });
    }

    // Calculate analytics
    const totalClicks = await db.affiliateClick.count({
      where: { affiliateId: affiliate.id }
    });

    const conversionRate = affiliate.totalReferrals > 0 
      ? (affiliate.activeReferrals / totalClicks) * 100 
      : 0;

    const thisMonthEarnings = affiliate.commissions.reduce((sum, commission) => {
      return sum + Number(commission.amount);
    }, 0);

    // Group clicks by date for chart
    const clicksChart = affiliate.clicks.reduce((acc, click) => {
      const date = click.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const chartData = {
      clicks: Object.entries(clicksChart).map(([date, clicks]) => ({
        date,
        clicks
      })),
      earnings: affiliate.commissions.map(commission => ({
        date: commission.createdAt.toISOString().split('T')[0],
        amount: Number(commission.amount)
      }))
    };

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalClicks,
          totalReferrals: affiliate.totalReferrals,
          activeReferrals: affiliate.activeReferrals,
          conversionRate: Math.round(conversionRate * 100) / 100,
          totalEarnings: Number(affiliate.totalEarnings),
          pendingEarnings: Number(affiliate.pendingEarnings),
          thisMonthEarnings
        },
        chartData,
        topReferrals: affiliate.referrals.map(referral => ({
          id: referral.id,
          name: referral.referredUser.name,
          phone: referral.referredUser.phone,
          totalDeposits: Number(referral.totalDeposits),
          totalCommissions: Number(referral.totalCommissions),
          joinDate: referral.createdAt.toISOString().split('T')[0],
          status: referral.status
        }))
      }
    });
    */

  } catch (error) {
    console.error("[AFFILIATE_ANALYTICS_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}