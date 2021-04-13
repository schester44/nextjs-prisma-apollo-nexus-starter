/*
  Warnings:

  - You are about to drop the column `planId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the `SubscriptionPlan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `externalProductId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "planId",
ADD COLUMN     "externalProductId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SubscriptionPlan";
