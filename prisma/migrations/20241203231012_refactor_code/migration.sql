/*
  Warnings:

  - You are about to drop the `Cell` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscipuladorNetwork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ObreiroNetwork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PastorNetwork` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_leaderId_fkey";

-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "Cell" DROP CONSTRAINT "Cell_pastorId_fkey";

-- DropForeignKey
ALTER TABLE "DiscipuladorNetwork" DROP CONSTRAINT "DiscipuladorNetwork_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "DiscipuladorNetwork" DROP CONSTRAINT "DiscipuladorNetwork_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "ObreiroNetwork" DROP CONSTRAINT "ObreiroNetwork_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "ObreiroNetwork" DROP CONSTRAINT "ObreiroNetwork_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "ObreiroNetwork" DROP CONSTRAINT "ObreiroNetwork_pastorId_fkey";

-- DropForeignKey
ALTER TABLE "PastorNetwork" DROP CONSTRAINT "PastorNetwork_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "PastorNetwork" DROP CONSTRAINT "PastorNetwork_pastorId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discipuladorId" INTEGER,
ADD COLUMN     "obreiroId" INTEGER,
ADD COLUMN     "pastorId" INTEGER;

-- DropTable
DROP TABLE "Cell";

-- DropTable
DROP TABLE "DiscipuladorNetwork";

-- DropTable
DROP TABLE "ObreiroNetwork";

-- DropTable
DROP TABLE "PastorNetwork";

-- DropTable
DROP TABLE "Report";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
