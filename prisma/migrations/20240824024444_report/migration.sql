-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_cellId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_pastorId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "quantityMembers" DROP NOT NULL,
ALTER COLUMN "quantityAttendees" DROP NOT NULL;
