/*
  Warnings:

  - Added the required column `pastorId` to the `ObreiroNetwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ObreiroNetwork" ADD COLUMN     "pastorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ObreiroNetwork" ADD CONSTRAINT "ObreiroNetwork_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
