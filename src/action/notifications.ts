/* eslint-disable @typescript-eslint/no-explicit-any */
// actions/notifications.ts
"use server";

import { pusher } from "@/lib/pusher";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createNotification({
  userId,
  title,
  description,
  icon = "INFO",
  metadata,
}: {
  userId: string;
  title: string;
  description?: string;
  icon?: "MONEY" | "BELL" | "TROPHY" | "WARNING" | "INFO";
  metadata?: any;
}) {
  try {
    const notification = await db.notification.create({
      data: {
        userId,
        title,
        description,
        icon,
        metadata,
      },
    });

    await pusher.trigger(`user-${userId}`, "new-notification", notification);

    return { success: true, notification };
  } catch (error) {
    console.error("Error creating notification:", error);
    return { success: false, error: "Failed to create notification" };
  }
}

export async function markNotificationAsRead(
  notificationId: string,
  userId: string
) {
  try {
    await db.notification.update({
      where: { id: notificationId, userId },
      data: { isRead: true },
    });

    revalidatePath("/notifications");
    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { success: false, error: "Failed to mark notification as read" };
  }
}

export async function getUnreadCount(userId: string) {
  return db.notification.count({
    where: { userId, isRead: false },
  });
}

export async function getUserNotifications(
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  notifications: Array<{
    id: string;
    title: string;
    description: string | null;
    icon: string;
    isRead: boolean;
    createdAt: Date;
    link: string | null;
  }>;
  totalCount: number;
}> {
  try {
    const skip = (page - 1) * limit;

    const [notifications, totalCount]: any = await Promise.all([
      db.notification.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      db.notification.count({ where: { userId } }),
    ]);

    return {
      notifications,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function deleteNotification(notificationId: string) {
  await db.notification.delete({
    where: { id: notificationId },
  });
}

export async function markAsRead(notificationId: string) {
  try {
    await db.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    // Revalidate the notifications page to reflect changes
    revalidatePath("/notifications");

    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { success: false, error: "Failed to mark notification as read" };
  }
}

export async function markAllAsRead(userId: string) {
  try {
    const updated = await db.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    // Revalidate the notifications page to reflect changes
    revalidatePath("/notifications");

    return { success: true, count: updated.count };
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return { success: false, error: "Failed to mark notifications as read" };
  }
}
