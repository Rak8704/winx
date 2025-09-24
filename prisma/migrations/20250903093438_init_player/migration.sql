/*
  Warnings:

  - You are about to drop the `APayDeposit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `APayWithdraw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AffiliateSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."APayDeposit" DROP CONSTRAINT "APayDeposit_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."APayWithdraw" DROP CONSTRAINT "APayWithdraw_userId_fkey";

-- DropIndex
DROP INDEX "public"."AffiliateClick_createdAt_idx";

-- DropIndex
DROP INDEX "public"."AffiliateClick_ipAddress_idx";

-- DropTable
DROP TABLE "public"."APayDeposit";

-- DropTable
DROP TABLE "public"."APayWithdraw";

-- DropTable
DROP TABLE "public"."AffiliateSettings";

-- CreateTable
CREATE TABLE "public"."Player" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerId_key" ON "public"."Player"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "public"."Player"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionId_key" ON "public"."Transaction"("transactionId");

-- CreateIndex
CREATE INDEX "AffiliateClick_converted_idx" ON "public"."AffiliateClick"("converted");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
