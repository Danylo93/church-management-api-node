/*
  Warnings:

  - The `membersPresent` column on the `CellReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `attendees` column on the `CellReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `visitors` column on the `CellReport` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CellReport" DROP COLUMN "membersPresent",
ADD COLUMN     "membersPresent" INTEGER[],
DROP COLUMN "attendees",
ADD COLUMN     "attendees" INTEGER[],
DROP COLUMN "visitors",
ADD COLUMN     "visitors" INTEGER[];
