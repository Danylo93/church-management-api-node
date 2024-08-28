/*
  Warnings:

  - You are about to drop the column `dateMeetCell` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityCLTGraduate` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityLTS` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityLeaders` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityLostMembers` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityMaturityGraduate` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `quantityVisitors` on the `Cell` table. All the data in the column will be lost.
  - Added the required column `date` to the `Cell` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_pastorId_fkey";

-- AlterTable
ALTER TABLE "Cell" DROP COLUMN "dateMeetCell",
DROP COLUMN "quantityCLTGraduate",
DROP COLUMN "quantityLTS",
DROP COLUMN "quantityLeaders",
DROP COLUMN "quantityLostMembers",
DROP COLUMN "quantityMaturityGraduate",
DROP COLUMN "quantityVisitors",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "quantityCLTCourse" INTEGER,
ADD COLUMN     "quantityMaturityCourse" INTEGER,
ADD COLUMN     "quantityNotConsolidated" INTEGER,
ADD COLUMN     "quantityNotConsolidatedMeeting" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cellName" TEXT,
ADD COLUMN     "discipuladorNetwork" TEXT,
ADD COLUMN     "obreiroNetwork" TEXT;
