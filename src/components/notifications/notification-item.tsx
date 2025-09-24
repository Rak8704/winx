/* eslint-disable @typescript-eslint/no-explicit-any */
// components/notification-item.tsx
"use client";

import { markNotificationAsRead } from "@/action/notifications";
import { NotificationWithUser } from "@/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const iconMap : any = {
  MONEY: "💰",
  BELL: "🔔",
  TROPHY: "🏆",
  WARNING: "⚠️",
  INFO: "ℹ️",
};

interface NotificationItemProps {
  notification: NotificationWithUser;
  userId: string;
}

export function NotificationItem({
  notification,
  userId,
}: NotificationItemProps) {
  const handleClick = async () => {
    if (!notification.isRead) {
      await markNotificationAsRead(notification.id, userId);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "rounded-lg border p-3 transition-colors hover:bg-accent",
        !notification.isRead && "bg-blue-50"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{iconMap[notification.icon]}</span>
        <div>
          <h4 className="font-medium">{notification.title}</h4>
          {notification.description && (
            <p className="text-sm text-muted-foreground">
              {notification.description}
            </p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
