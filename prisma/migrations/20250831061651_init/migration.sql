-- CreateEnum
CREATE TYPE "public"."PaymentWalletType" AS ENUM ('EWALLET', 'BANK', 'CARD', 'CRYPTO');

-- CreateEnum
CREATE TYPE "public"."DepositStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."WithdrawStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "public"."ManagementRole" AS ENUM ('ADMIN', 'SUBADMIN');

-- CreateEnum
CREATE TYPE "public"."NotificationIcon" AS ENUM ('MONEY', 'BELL', 'TROPHY', 'WARNING', 'INFO', 'DEPOSIT', 'WITHDRAW', 'BONUS');

-- CreateEnum
CREATE TYPE "public"."AffiliateTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND');

-- CreateEnum
CREATE TYPE "public"."ReferralStatus" AS ENUM ('PENDING', 'QUALIFIED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."CommissionType" AS ENUM ('DEPOSIT', 'BET', 'LOSS', 'SIGNUP', 'MONTHLY_BONUS');

-- CreateEnum
CREATE TYPE "public"."CommissionStatus" AS ENUM ('PENDING', 'APPROVED', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PayoutStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Pro User',
    "password" TEXT NOT NULL,
    "withdrawPassword" TEXT,
    "playerId" TEXT NOT NULL,
    "facebook" TEXT DEFAULT '',
    "isBanned" BOOLEAN NOT NULL,
    "referId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitedById" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BettingRecord" (
    "id" TEXT NOT NULL,
    "totalBet" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalWin" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BettingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invitation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InvitationBonus" (
    "id" TEXT NOT NULL,
    "totalRegisters" INTEGER NOT NULL DEFAULT 0,
    "totalValidreferral" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InvitationBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InvitationRewareds" (
    "id" TEXT NOT NULL,
    "rewardImg" TEXT NOT NULL,
    "targetReferral" INTEGER NOT NULL,
    "prize" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "InvitationRewareds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SigninBonusRewards" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "prize" INTEGER NOT NULL,
    "deposit" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "SigninBonusRewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClaimedSigninReward" (
    "id" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "depositId" TEXT NOT NULL,
    "isClamed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ClaimedSigninReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ClaimedInvitationReward" (
    "id" TEXT NOT NULL,
    "invitationBonusId" TEXT NOT NULL,
    "rewardId" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimedInvitationReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Wallet" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,
    "signinBonus" BOOLEAN NOT NULL DEFAULT false,
    "referralBonus" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL DEFAULT 'BDT',
    "turnOver" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bonus" (
    "id" TEXT NOT NULL,
    "signinBonus" INTEGER NOT NULL DEFAULT 5,
    "referralBonus" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Bonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PaymentWallet" (
    "id" TEXT NOT NULL,
    "walletLogo" TEXT NOT NULL,
    "walletName" TEXT NOT NULL,
    "walletType" "public"."PaymentWalletType" NOT NULL DEFAULT 'EWALLET',

    CONSTRAINT "PaymentWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DepositWallet" (
    "id" TEXT NOT NULL,
    "paymentWalletId" TEXT NOT NULL,
    "walletsNumber" TEXT[],
    "instructions" TEXT NOT NULL,
    "warning" TEXT,
    "trxType" TEXT NOT NULL,
    "minDeposit" DECIMAL(65,30) NOT NULL,
    "maximumDeposit" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DepositWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."APayDeposit" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "trxId" TEXT NOT NULL,
    "ps" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "APayDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."APayWithdraw" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "ps" TEXT NOT NULL,
    "trxId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "APayWithdraw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DurantoPayDeposit" (
    "id" TEXT NOT NULL,
    "invoice_no" TEXT NOT NULL,
    "dp_transaction_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DurantoPayDeposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DurantoPayWithdraw" (
    "id" TEXT NOT NULL,
    "invoice_no" TEXT NOT NULL,
    "dp_transaction_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "pay_type" TEXT NOT NULL,
    "wallet_number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DurantoPayWithdraw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Deposit" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "bonus" DECIMAL(65,30),
    "bonusFor" TEXT NOT NULL,
    "senderNumber" TEXT NOT NULL,
    "trxID" TEXT,
    "walletId" TEXT NOT NULL,
    "walletNumber" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,
    "status" "public"."DepositStatus" NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CardContainer" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CardContainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Card" (
    "id" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "walletNumber" TEXT NOT NULL,
    "paymentWalletid" TEXT NOT NULL,
    "containerId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Withdraw" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,
    "status" "public"."WithdrawStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Withdraw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "public"."ManagementRole" NOT NULL DEFAULT 'ADMIN',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailVerificationToken" (
    "id" TEXT NOT NULL,
    "expire" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SiteSetting" (
    "id" TEXT NOT NULL,
    "maxWithdraw" DECIMAL(65,30) DEFAULT 0,
    "minWithdraw" DECIMAL(65,30) DEFAULT 0,
    "dpTurnover" DECIMAL(65,30) DEFAULT 0,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon" "public"."NotificationIcon" NOT NULL DEFAULT 'INFO',
    "userId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Affiliate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "affiliateCode" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "totalEarnings" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "pendingEarnings" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalReferrals" INTEGER NOT NULL DEFAULT 0,
    "activeReferrals" INTEGER NOT NULL DEFAULT 0,
    "commissionRate" DECIMAL(65,30) NOT NULL DEFAULT 0.05,
    "tier" "public"."AffiliateTier" NOT NULL DEFAULT 'BRONZE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AffiliateReferral" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "status" "public"."ReferralStatus" NOT NULL DEFAULT 'PENDING',
    "firstDepositAmount" DECIMAL(65,30),
    "firstDepositDate" TIMESTAMP(3),
    "totalDeposits" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "totalBets" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffiliateReferral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AffiliateCommission" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "referralId" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "commissionType" "public"."CommissionType" NOT NULL,
    "sourceAmount" DECIMAL(65,30) NOT NULL,
    "commissionRate" DECIMAL(65,30) NOT NULL,
    "status" "public"."CommissionStatus" NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "AffiliateCommission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AffiliatePayout" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentDetails" JSONB NOT NULL,
    "status" "public"."PayoutStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "processedBy" TEXT,
    "notes" TEXT,
    "transactionId" TEXT,

    CONSTRAINT "AffiliatePayout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AffiliateClick" (
    "id" TEXT NOT NULL,
    "affiliateId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "referrerUrl" TEXT,
    "landingPage" TEXT NOT NULL,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "convertedUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AffiliateSettings" (
    "id" TEXT NOT NULL,
    "minPayoutAmount" DECIMAL(65,30) NOT NULL DEFAULT 100,
    "defaultCommissionRate" DECIMAL(65,30) NOT NULL DEFAULT 0.05,
    "cookieDuration" INTEGER NOT NULL DEFAULT 30,
    "tierRequirements" JSONB NOT NULL,
    "payoutSchedule" TEXT NOT NULL DEFAULT 'WEEKLY',
    "isSystemActive" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AffiliateSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "public"."User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_playerId_key" ON "public"."User"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_referId_key" ON "public"."User"("referId");

-- CreateIndex
CREATE UNIQUE INDEX "BettingRecord_userId_key" ON "public"."BettingRecord"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_userId_key" ON "public"."Invitation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InvitationBonus_userId_key" ON "public"."InvitationBonus"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimedSigninReward_userId_key" ON "public"."ClaimedSigninReward"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimedSigninReward_depositId_key" ON "public"."ClaimedSigninReward"("depositId");

-- CreateIndex
CREATE UNIQUE INDEX "ClaimedInvitationReward_invitationBonusId_rewardId_key" ON "public"."ClaimedInvitationReward"("invitationBonusId", "rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "public"."Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DurantoPayDeposit_invoice_no_key" ON "public"."DurantoPayDeposit"("invoice_no");

-- CreateIndex
CREATE UNIQUE INDEX "DurantoPayWithdraw_invoice_no_key" ON "public"."DurantoPayWithdraw"("invoice_no");

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_trackingNumber_key" ON "public"."Deposit"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CardContainer_userId_key" ON "public"."CardContainer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "public"."Notification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_userId_key" ON "public"."Affiliate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_affiliateCode_key" ON "public"."Affiliate"("affiliateCode");

-- CreateIndex
CREATE INDEX "Affiliate_affiliateCode_idx" ON "public"."Affiliate"("affiliateCode");

-- CreateIndex
CREATE INDEX "Affiliate_userId_idx" ON "public"."Affiliate"("userId");

-- CreateIndex
CREATE INDEX "AffiliateReferral_affiliateId_idx" ON "public"."AffiliateReferral"("affiliateId");

-- CreateIndex
CREATE INDEX "AffiliateReferral_referredUserId_idx" ON "public"."AffiliateReferral"("referredUserId");

-- CreateIndex
CREATE INDEX "AffiliateCommission_affiliateId_idx" ON "public"."AffiliateCommission"("affiliateId");

-- CreateIndex
CREATE INDEX "AffiliateCommission_status_idx" ON "public"."AffiliateCommission"("status");

-- CreateIndex
CREATE INDEX "AffiliatePayout_affiliateId_idx" ON "public"."AffiliatePayout"("affiliateId");

-- CreateIndex
CREATE INDEX "AffiliatePayout_status_idx" ON "public"."AffiliatePayout"("status");

-- CreateIndex
CREATE INDEX "AffiliateClick_affiliateId_idx" ON "public"."AffiliateClick"("affiliateId");

-- CreateIndex
CREATE INDEX "AffiliateClick_ipAddress_idx" ON "public"."AffiliateClick"("ipAddress");

-- CreateIndex
CREATE INDEX "AffiliateClick_createdAt_idx" ON "public"."AffiliateClick"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "public"."Invitation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BettingRecord" ADD CONSTRAINT "BettingRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invitation" ADD CONSTRAINT "Invitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InvitationBonus" ADD CONSTRAINT "InvitationBonus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClaimedSigninReward" ADD CONSTRAINT "ClaimedSigninReward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "public"."SigninBonusRewards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClaimedSigninReward" ADD CONSTRAINT "ClaimedSigninReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClaimedSigninReward" ADD CONSTRAINT "ClaimedSigninReward_depositId_fkey" FOREIGN KEY ("depositId") REFERENCES "public"."Deposit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClaimedInvitationReward" ADD CONSTRAINT "ClaimedInvitationReward_invitationBonusId_fkey" FOREIGN KEY ("invitationBonusId") REFERENCES "public"."InvitationBonus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ClaimedInvitationReward" ADD CONSTRAINT "ClaimedInvitationReward_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "public"."InvitationRewareds"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."APayDeposit" ADD CONSTRAINT "APayDeposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."APayWithdraw" ADD CONSTRAINT "APayWithdraw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DurantoPayDeposit" ADD CONSTRAINT "DurantoPayDeposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DurantoPayWithdraw" ADD CONSTRAINT "DurantoPayWithdraw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Deposit" ADD CONSTRAINT "Deposit_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."DepositWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Deposit" ADD CONSTRAINT "Deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CardContainer" ADD CONSTRAINT "CardContainer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Card" ADD CONSTRAINT "Card_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "public"."CardContainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Withdraw" ADD CONSTRAINT "Withdraw_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "public"."Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Withdraw" ADD CONSTRAINT "Withdraw_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Affiliate" ADD CONSTRAINT "Affiliate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AffiliateReferral" ADD CONSTRAINT "AffiliateReferral_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "public"."Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AffiliateReferral" ADD CONSTRAINT "AffiliateReferral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AffiliateCommission" ADD CONSTRAINT "AffiliateCommission_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "public"."Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AffiliateCommission" ADD CONSTRAINT "AffiliateCommission_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "public"."AffiliateReferral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AffiliatePayout" ADD CONSTRAINT "AffiliatePayout_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "public"."Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AffiliateClick" ADD CONSTRAINT "AffiliateClick_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "public"."Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
