/*
  Warnings:

  - Changed the type of `visitors` on the `CellReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CellReport" DROP COLUMN "visitors",
ADD COLUMN     "visitors" INTEGER NOT NULL;
