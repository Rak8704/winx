import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface MakeDepositRequestInput {
  amount: Decimal;
  bonus: Decimal;
  walletId: string;
  walletNumber: string;
  bonusFor: string;
  senderNumber: string;
}
export interface MakeDepositRequestOutput {
  success: boolean;
  payload: {
    trackingNuber: string;
    paymentCallback: string;
  };
}

export type ExtendedWallet = Prisma.DepositWalletGetPayload<object> & {
  paymentWallet: Prisma.PaymentWalletGetPayload<object>;
};

export interface GetDepositDataOutput {
  payload: {
    wallets: ExtendedWallet[];
    bonus: Prisma.BonusGetPayload<object>;
  };
  success: boolean;
}
