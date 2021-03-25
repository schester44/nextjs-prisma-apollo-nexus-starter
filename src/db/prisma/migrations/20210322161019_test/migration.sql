/*
  Warnings:

  - The migration will change the primary key for the `verification_requests` table. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "verification_requests" DROP CONSTRAINT "verification_requests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "verification_requests_id_seq";
