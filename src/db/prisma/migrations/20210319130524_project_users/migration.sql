/*
  Warnings:

  - You are about to drop the `ProjectUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectUsers" DROP CONSTRAINT "ProjectUsers_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectUsers" DROP CONSTRAINT "ProjectUsers_userId_fkey";

-- CreateTable
CREATE TABLE "project_users" (
    "projectId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "ProjectUserRole" NOT NULL DEFAULT E'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("projectId","userId")
);

-- DropTable
DROP TABLE "ProjectUsers";

-- AddForeignKey
ALTER TABLE "project_users" ADD FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_users" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
