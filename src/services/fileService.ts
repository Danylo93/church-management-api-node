import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFileMetadataFromDatabase = async (file: any) => {
    try {
      // Buscando o arquivo na tabela Arquivos pelo fileName
      const metadata = await prisma.arquivos.findUnique({
        where: {
          fileName: file.name, // Agora funcionará se fileName for único
        },
        select: {
          titulo: true,
          dataCulto: true,
        },
      });
  
      // Retorna os metadados se encontrados
      return metadata || null;
    } catch (error) {
      console.error('Erro ao buscar metadados do arquivo', error);
      return null;
    }
  };
