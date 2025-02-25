/*
  Warnings:

  - Added the required column `email` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "address" TEXT,
ADD COLUMN     "discipuladorId" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "leaderId" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "obreiroId" TEXT,
ADD COLUMN     "pastorId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
