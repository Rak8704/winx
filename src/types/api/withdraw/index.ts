import { Prisma } from "@prisma/client";

export interface WithdrawPageData {
  mainBalance: number;
  availableBalance: number;
  remainingWithdrawal: number;
  minWithdraw: number;
  maxWithdraw: number;
  turnOver: number;
}

export interface MakeWithdrawInput {
  amount: number;
  password: string;
  cardId: string;
}

export interface MakeWithdrawOutput {
  withdraw: Prisma.WithdrawGetPayload<{ include: { card: true } }>;
}
