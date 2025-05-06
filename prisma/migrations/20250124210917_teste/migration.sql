/*
  Warnings:

  - You are about to drop the column `userId` on the `Enrollment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_userId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_EnrollmentToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EnrollmentToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EnrollmentToUser_B_index" ON "_EnrollmentToUser"("B");

-- AddForeignKey
ALTER TABLE "_EnrollmentToUser" ADD CONSTRAINT "_EnrollmentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Enrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EnrollmentToUser" ADD CONSTRAINT "_EnrollmentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
