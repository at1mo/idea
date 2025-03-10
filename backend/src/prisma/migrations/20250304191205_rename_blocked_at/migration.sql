/*
  Warnings:

  - You are about to drop the column `blokedAt` on the `Idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "blokedAt",
ADD COLUMN     "blockedAt" TIMESTAMP(3);
