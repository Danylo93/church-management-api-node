-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "obreiroNetwork" TEXT,
    "discipuladorNetwork" TEXT,
    "cellName" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "photo" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NetworkObreiro" (
    "id" SERIAL NOT NULL,
    "pastorId" INTEGER NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantityCells" INTEGER NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,

    CONSTRAINT "NetworkObreiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NetworkDiscipulador" (
    "id" SERIAL NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,

    CONSTRAINT "NetworkDiscipulador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
    "leaderId" INTEGER NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT,
    "obreiroId" INTEGER NOT NULL,
    "pastorId" INTEGER NOT NULL,
    "quantityGuardAngels" INTEGER,
    "quantityNotConsolidated" INTEGER,
    "quantityMaturityCourse" INTEGER,
    "quantityCLTCourse" INTEGER,
    "quantityNotConsolidatedMeeting" INTEGER,
    "cellPhase" TEXT NOT NULL,
    "multiplicationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "cellId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,
    "quantityNotConsolidated" INTEGER NOT NULL,
    "quantityGuardAngels" INTEGER NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "pastorId" INTEGER NOT NULL,
    "leaderId" INTEGER NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "NetworkObreiro" ADD CONSTRAINT "NetworkObreiro_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NetworkObreiro" ADD CONSTRAINT "NetworkObreiro_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NetworkDiscipulador" ADD CONSTRAINT "NetworkDiscipulador_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NetworkDiscipulador" ADD CONSTRAINT "NetworkDiscipulador_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cell" ADD CONSTRAINT "Cell_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_discipuladorId_fkey" FOREIGN KEY ("discipuladorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_obreiroId_fkey" FOREIGN KEY ("obreiroId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_pastorId_fkey" FOREIGN KEY ("pastorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
