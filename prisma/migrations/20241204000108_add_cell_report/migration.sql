/*
  Warnings:

  - Added the required column `pastorId` to the `CellReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workerId` to the `CellReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CellReport" ADD COLUMN     "pastorId" INTEGER NOT NULL,
ADD COLUMN     "workerId" INTEGER NOT NULL;
