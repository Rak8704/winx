import zod from "zod";

export const registerSchema = zod
  .object({
    phone: zod
      .string()
      .min(1, "Phone Number is required"),
    password: zod
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: zod.string(),
    ageCheck: zod.optional(zod.boolean()),
    bonusCheck: zod.optional(zod.boolean()),
    referralId: zod.optional(zod.string()),
  })
  .refine(
    ({ password, confirmPassword }) => {
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          return false;
        }
      }
      return true;
    },
    { path: ["confirmPassword"], message: "Confirm Password didn't match" }
  );

export const loginSchema = zod.object({
  phone: zod
    .string()
    .min(1, "Phone Number is required")
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, "Invalid Phone Number"),
  password: zod.string(),
});

export const newCardCreateSchema = zod.object({
  payeerName: zod.string().min(1, "Payeer name required"),
  walletNumber: zod
    .string()
    .min(1, "Wallet Number is required")
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, "Invalid Wallet Number"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
  paymentWalletId: zod.string(),
});

export const cardCreateSchema = zod.object({
  walletNumber: zod
    .string()
    .min(1, "Wallet Number is required")
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, "Invalid Wallet Number"),
  password: zod.string().min(1, "Password is required"),
  paymentWalletId: zod.string(),
});

export const withdrawSchema = zod.object({
  amount: zod.string().min(1, "Enter amount"),
  password: zod.string().min(1, "Password is required"),
  walletNumber: zod.string().min(1, "Wallet or Account number is required"),
});

export const accountUpdateSchema = zod.object({
  phone: zod
    .string()
    .min(1, "Phone number is required")
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, "Invalid Phone Number"),
  name: zod.optional(zod.string()),
  facebook: zod.optional(zod.string()),
});

export type AccountUpdateSchema = zod.infer<typeof accountUpdateSchema>;

export const passwordChangeSchema = zod.object({
  currentPassword: zod.string().min(1, "Current password is required"),
  newPassword: zod
    .string()
    .min(6, "Password must be at least 6 characters long"),
});

export type PasswordChangeSchema = zod.infer<typeof passwordChangeSchema>;

export const setPasswordChangeSchema = zod.object({
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});

export type SetPasswordChangeSchema = zod.infer<typeof setPasswordChangeSchema>;
