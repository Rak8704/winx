import { Notification, User } from "@prisma/client";

export type NotificationWithUser = Notification & {
  user: User;
};
