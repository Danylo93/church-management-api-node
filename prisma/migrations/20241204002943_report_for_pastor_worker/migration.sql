/*
  Warnings:

  - Made the column `pastorId` on table `CellReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workerId` on table `CellReport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CellReport" ALTER COLUMN "pastorId" SET NOT NULL,
ALTER COLUMN "workerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "CellReport" ADD CONSTRAINT "CellReport_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CellReport" ADD CONSTRAINT "CellReport_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
