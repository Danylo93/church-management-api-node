/*
  Warnings:

  - The `discipuladorId` column on the `Enrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `leaderId` column on the `Enrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `obreiroId` column on the `Enrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pastorId` column on the `Enrollment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "discipuladorId",
ADD COLUMN     "discipuladorId" INTEGER,
DROP COLUMN "leaderId",
ADD COLUMN     "leaderId" INTEGER,
DROP COLUMN "obreiroId",
ADD COLUMN     "obreiroId" INTEGER,
DROP COLUMN "pastorId",
ADD COLUMN     "pastorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
