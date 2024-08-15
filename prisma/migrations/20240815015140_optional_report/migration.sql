-- AlterTable
ALTER TABLE "Cell" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "quantityCLTCourse" DROP NOT NULL,
ALTER COLUMN "quantityGuardAngels" DROP NOT NULL,
ALTER COLUMN "quantityMaturityCourse" DROP NOT NULL,
ALTER COLUMN "quantityNotConsolidated" DROP NOT NULL,
ALTER COLUMN "quantityNotConsolidatedMeeting" DROP NOT NULL;
