/*
  Warnings:

  - You are about to drop the column `cellName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `discipuladorNetwork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `obreiroNetwork` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `NetworkDiscipulador` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NetworkObreiro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NetworkDiscipulador" DROP CONSTRAINT "NetworkDiscipulador_discipuladorId_fkey";

-- DropForeignKey
ALTER TABLE "NetworkDiscipulador" DROP CONSTRAINT "NetworkDiscipulador_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "NetworkObreiro" DROP CONSTRAINT "NetworkObreiro_obreiroId_fkey";

-- DropForeignKey
ALTER TABLE "NetworkObreiro" DROP CONSTRAINT "NetworkObreiro_pastorId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cellName",
DROP COLUMN "discipuladorNetwork",
DROP COLUMN "obreiroNetwork";

-- DropTable
DROP TABLE "NetworkDiscipulador";

-- DropTable
DROP TABLE "NetworkObreiro";

-- CreateTable
CREATE TABLE "PastorNetwork" (
    "id" SERIAL NOT NULL,
    "pastorId" INTEGER NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantityCells" INTEGER NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,

    CONSTRAINT "PastorNetwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObreiroNetwork" (
    "id" SERIAL NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,

    CONSTRAINT "ObreiroNetwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscipuladorNetwork" (
    "id" SERIAL NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,

    CONSTRAINT "DiscipuladorNetwork_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PastorNetwork" ADD CONSTRAINT "PastorNetwork_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastorNetwork" ADD CONSTRAINT "PastorNetwork_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObreiroNetwork" ADD CONSTRAINT "ObreiroNetwork_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObreiroNetwork" ADD CONSTRAINT "ObreiroNetwork_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscipuladorNetwork" ADD CONSTRAINT "DiscipuladorNetwork_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscipuladorNetwork" ADD CONSTRAINT "DiscipuladorNetwork_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
