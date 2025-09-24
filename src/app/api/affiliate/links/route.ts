import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { z } from "zod";

// Schema for link generation
const linkGenerationSchema = z.object({
  campaign: z.string().optional(),
  medium: z.string().optional(),
  source: z.string().optional(),
  customParams: z.record(z.string()).optional(),
});

// GET - Get affiliate links and tracking info
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // For now, return mock affiliate links data
    const mockAffiliateCode = "AFF" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    const mockLinks = {
      affiliateCode: mockAffiliateCode,
      baseReferralLink: `${baseUrl}/register?ref=${mockAffiliateCode}`,
      customLinks: [
        {
          id: "link_1",
          name: "Homepage Referral",
          url: `${baseUrl}/?ref=${mockAffiliateCode}`,
          clicks: 45,
          conversions: 3,
          conversionRate: 6.67,
          createdAt: "2024-01-15T10:00:00Z"
        },
        {
          id: "link_2", 
          name: "Games Page Referral",
          url: `${baseUrl}/games?ref=${mockAffiliateCode}`,
          clicks: 32,
          conversions: 2,
          conversionRate: 6.25,
          createdAt: "2024-01-18T14:30:00Z"
        },
        {
          id: "link_3",
          name: "Bonus Campaign",
          url: `${baseUrl}/register?ref=${mockAffiliateCode}&campaign=bonus100`,
          clicks: 67,
          conversions: 8,
          conversionRate: 11.94,
          createdAt: "2024-01-20T09:15:00Z"
        }
      ],
      totalStats: {
        totalClicks: 144,
        totalConversions: 13,
        overallConversionRate: 9.03
      }
    };

    return NextResponse.json({
      success: true,
      data: mockLinks
    });

    /* TODO: Uncomment this once database migration is complete
    // Check if user is an affiliate
    const affiliate = await db.affiliate.findUnique({
      where: { userId: session.user.id },
      include: {
        clicks: {
          select: {
            id: true,
            createdAt: true,
            referredUserId: true
          }
        },
        referrals: {
          select: {
            id: true,
            status: true
          }
        }
      }
    });

    if (!affiliate) {
      return NextResponse.json({ 
        error: "User is not an affiliate" 
      }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const baseReferralLink = `${baseUrl}/register?ref=${affiliate.affiliateCode}`;

    // Calculate stats
    const totalClicks = affiliate.clicks.length;
    const totalConversions = affiliate.referrals.filter(r => r.status !== 'PENDING').length;
    const overallConversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    // Get custom links (this would be from a separate table in a real implementation)
    const customLinks = [
      {
        id: "homepage",
        name: "Homepage Referral",
        url: `${baseUrl}/?ref=${affiliate.affiliateCode}`,
        clicks: affiliate.clicks.filter(c => c.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
        conversions: affiliate.referrals.filter(r => r.status === 'ACTIVE').length,
        conversionRate: 0,
        createdAt: affiliate.createdAt
      }
    ];

    return NextResponse.json({
      success: true,
      data: {
        affiliateCode: affiliate.affiliateCode,
        baseReferralLink,
        customLinks,
        totalStats: {
          totalClicks,
          totalConversions,
          overallConversionRate: Math.round(overallConversionRate * 100) / 100
        }
      }
    });
    */

  } catch (error) {
    console.error("[AFFILIATE_LINKS_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Generate custom affiliate link
export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = linkGenerationSchema.parse(body);

    // For now, return mock custom link
    const mockAffiliateCode = "AFF" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    // Build custom link with parameters
    const params = new URLSearchParams();
    params.set('ref', mockAffiliateCode);
    
    if (validatedData.campaign) params.set('campaign', validatedData.campaign);
    if (validatedData.medium) params.set('medium', validatedData.medium);
    if (validatedData.source) params.set('source', validatedData.source);
    
    if (validatedData.customParams) {
      Object.entries(validatedData.customParams).forEach(([key, value]) => {
        params.set(key, value);
      });
    }

    const customLink = `${baseUrl}/register?${params.toString()}`;

    return NextResponse.json({
      success: true,
      message: "Custom affiliate link generated successfully",
      data: {
        linkId: `link_${Date.now()}`,
        url: customLink,
        shortUrl: `${baseUrl}/r/${mockAffiliateCode}`, // Short URL for easier sharing
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(customLink)}`
      }
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

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    // Build custom link with parameters
    const params = new URLSearchParams();
    params.set('ref', affiliate.affiliateCode);
    
    if (validatedData.campaign) params.set('campaign', validatedData.campaign);
    if (validatedData.medium) params.set('medium', validatedData.medium);
    if (validatedData.source) params.set('source', validatedData.source);
    
    if (validatedData.customParams) {
      Object.entries(validatedData.customParams).forEach(([key, value]) => {
        params.set(key, value);
      });
    }

    const customLink = `${baseUrl}/register?${params.toString()}`;

    // In a real implementation, you might want to store custom links in the database
    // for tracking and analytics purposes

    return NextResponse.json({
      success: true,
      message: "Custom affiliate link generated successfully",
      data: {
        linkId: `link_${Date.now()}`,
        url: customLink,
        shortUrl: `${baseUrl}/r/${affiliate.affiliateCode}`,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(customLink)}`
      }
    });
    */

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("[AFFILIATE_LINKS_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}