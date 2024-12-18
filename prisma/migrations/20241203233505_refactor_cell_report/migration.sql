-- CreateTable
CREATE TABLE "CellReport" (
    "id" SERIAL NOT NULL,
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "membersPresent" INTEGER NOT NULL,
    "attendees" INTEGER NOT NULL,
    "visitors" INTEGER NOT NULL,
    "additionalInfo" TEXT,
    "cellName" TEXT,
    "multiplicationDate" TIMESTAMP(3),
    "cellPhase" TEXT,
    "leaderId" INTEGER NOT NULL,
    "disciplerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CellReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CellReport" ADD CONSTRAINT "CellReport_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CellReport" ADD CONSTRAINT "CellReport_disciplerId_fkey" FOREIGN KEY ("disciplerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
