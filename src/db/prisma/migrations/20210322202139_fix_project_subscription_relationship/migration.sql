/*
  Warnings:

  - You are about to drop the `_ProjectToSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToSubscription" DROP CONSTRAINT "_ProjectToSubscription_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToSubscription" DROP CONSTRAINT "_ProjectToSubscription_B_fkey";

-- DropTable
DROP TABLE "_ProjectToSubscription";

-- AddForeignKey
ALTER TABLE "Subscription" ADD FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
