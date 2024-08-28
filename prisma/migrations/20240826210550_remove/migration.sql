/*
  Warnings:

  - You are about to drop the column `date` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityCLTCourse` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityMaturityCourse` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityNotConsolidated` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityNotConsolidatedMeeting` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `cellName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discipuladorNetwork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `obreiroNetwork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `referenceId` on the `User` table. All the data in the column will be lost.
  - Added the required column `dateMeetCell` to the `Cell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cell" DROP COLUMN "date",
DROP COLUMN "quantityCLTCourse",
DROP COLUMN "quantityMaturityCourse",
DROP COLUMN "quantityNotConsolidated",
DROP COLUMN "quantityNotConsolidatedMeeting",
ADD COLUMN     "dateMeetCell" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "quantityCLTGraduate" INTEGER,
ADD COLUMN     "quantityLTS" INTEGER,
ADD COLUMN     "quantityLeaders" INTEGER,
ADD COLUMN     "quantityLostMembers" INTEGER,
ADD COLUMN     "quantityMaturityGraduate" INTEGER,
ADD COLUMN     "quantityVisitors" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cellName",
DROP COLUMN "discipuladorNetwork",
DROP COLUMN "obreiroNetwork",
DROP COLUMN "referenceId";

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
