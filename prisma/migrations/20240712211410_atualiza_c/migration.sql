/*
  Warnings:

  - Added the required column `cellPhase` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `multiplicationDate` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obreiroId` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pastorId` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityCLTCourse` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityGuardAngels` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityMaturityCourse` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityNotConsolidated` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityNotConsolidatedMeeting` to the `Cell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cell" ADD COLUMN     "cellPhase" TEXT NOT NULL,
ADD COLUMN     "multiplicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "obreiroId" INTEGER NOT NULL,
ADD COLUMN     "pastorId" INTEGER NOT NULL,
ADD COLUMN     "quantityCLTCourse" INTEGER NOT NULL,
ADD COLUMN     "quantityGuardAngels" INTEGER NOT NULL,
ADD COLUMN     "quantityMaturityCourse" INTEGER NOT NULL,
ADD COLUMN     "quantityNotConsolidated" INTEGER NOT NULL,
ADD COLUMN     "quantityNotConsolidatedMeeting" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "cellId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,
    "quantityNotConsolidated" INTEGER NOT NULL,
    "quantityGuardAngels" INTEGER NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "pastorId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
