// app/api/notifications/route.ts
import { createNotification } from "@/action/notifications";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const skip = (page - 1) * limit;

    const [notifications, totalCount] = await Promise.all([
      db.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.notification.count({ where: { userId } }),
    ]);

    return NextResponse.json({
      notifications: notifications || [],
      totalCount: totalCount || 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
const notificationSchema = z.object({
  userId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  icon: z.enum(["MONEY", "BELL", "TROPHY", "WARNING", "INFO"]).optional(),
  metadata: z.any().optional(),
});

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validation = notificationSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const result = await createNotification(validation.data);

  if (result && !result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result.notification);
}
