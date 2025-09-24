/* eslint-disable @typescript-eslint/no-explicit-any */
// components/notifications/notification-list.tsx
"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { deleteNotification, markAsRead } from "@/action/notifications";

type Notification = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
};

const iconMap = {
  MONEY: "💲",
  BELL: "🔔",
  TROPHY: "🏆",
  WARNING: "⚠️",
  INFO: "ℹ️",
} as const;

const ITEMS_PER_PAGE = 10;

export function NotificationList({
  userId,
  initialNotifications = [],
  totalCount = 0,
}: {
  userId: string;
  initialNotifications?: any[];
  totalCount?: number;
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`user-${userId}`);
    channel.bind("new-notification", (newNotification: Notification) => {
      setNotifications((prev) => [
        newNotification,
        ...prev.slice(0, ITEMS_PER_PAGE - 1),
      ]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [userId]);

  const handleDelete = async (notificationId: string) => {
    setIsDeleting(notificationId);
    try {
      await deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } finally {
      setIsDeleting(null);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId);
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);

    await Promise.all(unreadIds.map((id) => markAsRead(id)));
    setNotifications((prev) =>
      prev.map((n) => (unreadIds.includes(n.id) ? { ...n, isRead: true } : n))
    );
  };

  const fetchPage = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/notifications?userId=${userId}&page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      
      // Check if response is ok before parsing JSON
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Fetch notifications failed:", errorText);
        throw new Error(`Fetch notifications failed with status ${res.status}: ${errorText}`);
      }
      
      const text = await res.text();
      if (!text) {
        throw new Error("Empty response from server");
      }
      
      const data = JSON.parse(text);
      setNotifications(data.notifications || []);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Notifications
        </h2>
        {notifications.some((n) => !n.isRead) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            disabled={isLoading}
          >
            Mark all as read
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No notifications found
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                relative group
                rounded-lg border
                ${
                  !notification.isRead
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "bg-white dark:bg-gray-800"
                }
                border-gray-200 dark:border-gray-700
                overflow-hidden
                transition-all duration-200
                hover:shadow-md
              `}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">
                    {iconMap[notification.icon as keyof typeof iconMap] ||
                      iconMap.BELL}
                  </span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={notification.link || "#"}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="block"
                    >
                      <h4
                        className={`font-medium truncate ${
                          !notification.isRead
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      {notification.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {notification.description}
                        </p>
                      )}
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(notification.id);
                    }}
                    disabled={isDeleting === notification.id}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1"
                  >
                    {isDeleting === notification.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              {!notification.isRead && (
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              )}
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1 || isLoading}
            onClick={() => fetchPage(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages || isLoading}
            onClick={() => fetchPage(currentPage + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
