/*
  Warnings:

  - You are about to drop the `Arquivo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Arquivo";

-- CreateTable
CREATE TABLE "Arquivos" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "dataCulto" TIMESTAMP(3) NOT NULL,
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "Arquivos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Arquivos_fileName_key" ON "Arquivos"("fileName");
