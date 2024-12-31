import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllCells = async () => {
  try {
    const cells = await prisma.cell.findMany({
      include: {
        leader: { select: { id: true, name: true } },
        discipler: { select: { id: true, name: true } },
        pastor: { select: { id: true, name: true } },
        obreiro: { select: { id: true, name: true } },
      },
    });
    return cells;
  } catch (error) {
    throw new Error('Erro ao recuperar as células.');
  }
};
