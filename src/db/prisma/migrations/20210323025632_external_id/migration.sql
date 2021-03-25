/*
  Warnings:

  - Added the required column `externalId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "externalId" TEXT NOT NULL;
