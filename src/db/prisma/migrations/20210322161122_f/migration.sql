/*
  Warnings:

  - The migration will change the primary key for the `verification_requests` table. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `verification_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "verification_requests" DROP CONSTRAINT "verification_requests_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
