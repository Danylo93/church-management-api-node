-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "quantityCLTCourse" INTEGER,
ADD COLUMN     "quantityNotConsolidatedMeeting" INTEGER,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "quantityNotConsolidated" DROP NOT NULL,
ALTER COLUMN "quantityGuardAngels" DROP NOT NULL;
