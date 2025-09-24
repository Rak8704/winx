
import { Prisma } from "@prisma/client";

export type ExtendedWithUserRewards = Prisma.InvitationRewardsGetPayload<{
  include: { claimedUsers: true };
}> & { 
  completedReferral: number; 
  isClaimed: boolean; 
};

export interface StatisticType {
  todayIncome: number;
  totalIncome: number;
  registersCount: number;
  validReferral: number;
}

export interface InvitationRewardGetOutput {
  rewards: ExtendedWithUserRewards[];
  statistic: StatisticType;
}
