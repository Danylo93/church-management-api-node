-- CreateTable
CREATE TABLE "Arquivo" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "dataCulto" TIMESTAMP(3) NOT NULL,
    "fileUrl" TEXT NOT NULL,

    CONSTRAINT "Arquivo_pkey" PRIMARY KEY ("id")
);
