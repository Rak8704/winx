/*
  Warnings:

  - You are about to alter the column `totalEarnings` on the `Affiliate` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `pendingEarnings` on the `Affiliate` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `commissionRate` on the `Affiliate` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `amount` on the `AffiliateCommission` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `sourceAmount` on the `AffiliateCommission` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `commissionRate` on the `AffiliateCommission` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `amount` on the `AffiliatePayout` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `firstDepositAmount` on the `AffiliateReferral` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `totalDeposits` on the `AffiliateReferral` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `totalBets` on the `AffiliateReferral` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `totalBet` on the `BettingRecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `totalWin` on the `BettingRecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `amount` on the `Deposit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `bonus` on the `Deposit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `minDeposit` on the `DepositWallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `maximumDeposit` on the `DepositWallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `DurantoPayDeposit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `DurantoPayWithdraw` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `deposit` on the `SigninBonusRewards` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `maxWithdraw` on the `SiteSetting` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `minWithdraw` on the `SiteSetting` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `dpTurnover` on the `SiteSetting` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `balance` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `turnOver` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(18,2)`.
  - You are about to alter the column `amount` on the `Withdraw` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the `InvitationRewareds` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[playerId]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."ClaimedInvitationReward" DROP CONSTRAINT "ClaimedInvitationReward_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Affiliate" ALTER COLUMN "totalEarnings" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "pendingEarnings" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "commissionRate" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "public"."AffiliateCommission" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "sourceAmount" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "commissionRate" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "public"."AffiliatePayout" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "public"."AffiliateReferral" ALTER COLUMN "firstDepositAmount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "totalDeposits" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "totalBets" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "public"."BettingRecord" ALTER COLUMN "totalBet" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "totalWin" SET DATA TYPE DECIMAL(18,2);

-- AlterTable
ALTER TABLE "public"."Deposit" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "bonus" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."DepositWallet" ALTER COLUMN "minDeposit" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "maximumDeposit" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."DurantoPayDeposit" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."DurantoPayWithdraw" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."Player" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'BDT';

-- AlterTable
ALTER TABLE "public"."SigninBonusRewards" ALTER COLUMN "deposit" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."SiteSetting" ALTER COLUMN "maxWithdraw" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "minWithdraw" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "dpTurnover" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."Transaction" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "email" TEXT,
ADD COLUMN     "gameXAPlayerId" TEXT;

-- AlterTable
ALTER TABLE "public"."Wallet" ADD COLUMN     "playerId" TEXT,
ALTER COLUMN "balance" SET DEFAULT 0,
ALTER COLUMN "balance" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "turnOver" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Withdraw" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- DropTable
DROP TABLE "public"."InvitationRewareds";

-- CreateTable
CREATE TABLE "public"."InvitationRewards" (
    "id" TEXT NOT NULL,
    "rewardImg" TEXT NOT NULL,
    "targetReferral" INTEGER NOT NULL,
    "prize" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "InvitationRewards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_playerId_key" ON "public"."Wallet"("playerId");

-- AddForeignKey
ALTER TABLE "public"."ClaimedInvitationReward" ADD CONSTRAINT "ClaimedInvitationReward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "public"."InvitationRewards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
