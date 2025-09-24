/* eslint-disable @typescript-eslint/no-explicit-any */
// components/notification-toaster.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";

const iconMap : any = {
  MONEY: "💲",
  BELL: "🔔",
  TROPHY: "🏆",
  WARNING: "⚠️",
  INFO: "ℹ️",
  default: "🔔",
};

export function NotificationToaster({ userId }: { userId: string }) {
  const router = useRouter();

  useEffect(() => {
    const createContainer = () => {
      const container = document.createElement("div");
      container.id = "notification-container";
      container.className = `
        fixed bottom-4 right-4
        space-y-3
        z-50
        w-full max-w-xs
      `;
      document.body.appendChild(container);
      return container;
    };

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe(`user-${userId}`);
    channel.bind("new-notification", (notification: any) => {
      const toastId = `toast-${Date.now()}`;
      const toastElement = document.createElement("div");
      toastElement.id = toastId;
      toastElement.className = `
        notification-toast
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-lg shadow-lg
        px-4
        py-2
        cursor-pointer
        transform transition-all duration-300
        animate-in slide-in-from-right-8
        hover:shadow-xl
        relative
        overflow-hidden
      `;

      // Add progress bar
      const progressBar = document.createElement("div");
      progressBar.className = `
        absolute bottom-0 left-0 right-0 h-1 bg-blue-500/20
        origin-left
        animate-progress
      `;
      progressBar.style.animationDuration = "5000ms";

      toastElement.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-2xl">
            ${iconMap[notification.icon] || iconMap.default}
          </span>
          <div class="flex-1">
            <h4 class="font-semibold text-gray-900 dark:text-white">
              ${notification.title}
            </h4>
            ${
              notification.description
                ? `
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                ${notification.description}
              </p>
            `
                : ""
            }
          </div>
          <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <X class="h-4 w-4" />
          </button>
        </div>
      `;

      toastElement.appendChild(progressBar);

      // Add close button functionality
      const closeButton = toastElement.querySelector("button");
      closeButton?.addEventListener("click", (e) => {
        e.stopPropagation();
        dismissToast(toastElement);
      });

      // Add click handler
      toastElement.addEventListener("click", () => {
        router.push("/notifications");
        dismissToast(toastElement);
      });

      // Add to container
      const container =
        document.getElementById("notification-container") || createContainer();
      container.prepend(toastElement);

      // Auto-dismiss after 5 seconds
      const timeoutId = setTimeout(() => {
        dismissToast(toastElement);
      }, 5000);

      // Store timeout ID for cleanup
      toastElement.dataset.timeoutId = timeoutId.toString();
    });

    const dismissToast = (toastElement: HTMLElement) => {
      toastElement.classList.add(
        "animate-out",
        "fade-out",
        "slide-out-to-right-8"
      );
      toastElement.addEventListener("animationend", () => {
        const timeoutId = toastElement.dataset.timeoutId;
        if (timeoutId) clearTimeout(parseInt(timeoutId));
        toastElement.remove();
      });
    };

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      // Clean up any remaining toasts
      document.getElementById("notification-container")?.remove();
    };
  }, [userId, router]);

  return null;
}
