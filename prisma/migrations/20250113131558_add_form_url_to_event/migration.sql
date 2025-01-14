/*
  Warnings:

  - You are about to drop the column `formFields` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "formFields",
ADD COLUMN     "formUrl" TEXT;
