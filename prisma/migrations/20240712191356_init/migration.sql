-- CreateTable
CREATE TABLE "NetworkObreiro" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pastorId" INTEGER NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "quantityCells" INTEGER NOT NULL,
    "quantityMembers" INTEGER NOT NULL,
    "quantityAttendees" INTEGER NOT NULL,

    CONSTRAINT "NetworkObreiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NetworkDiscipulador" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "obreiroId" INTEGER NOT NULL,
    "discipuladorId" INTEGER NOT NULL,
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
    "address" TEXT NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("id")
);

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
