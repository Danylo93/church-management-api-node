import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const createCellReport = async (data: any) => {
  return prisma.cellReport.create({ data });
};

export const updateCellReport = async (id: number, data: any) => {
  return prisma.cellReport.update({
    where: { id },
    data,
  });
};

export const deleteCellReport = async (id: number) => {
  await prisma.cellReport.delete({
    where: { id },
  });
};

export const getCellReportsByLeader = async (leaderId: number) => {
    return prisma.cellReport.findMany({
      where: { leaderId },
      include: {
        leader: {
          select: {
            id: true,
            name: true, // Incluindo o nome do líder
          },
        },
      },
      orderBy: { meetingDate: "desc" },
    });
  };

  export const getCellReportsByDiscipler = async (disciplerId: number) => {
    return prisma.cellReport.findMany({
      where: { disciplerId },
      include: {
        leader: {
          select: {
            id: true,
            name: true, // Nome do líder
          },
        },
        discipler: {
          select: {
            id: true,
            name: true, // Nome do discipulador
          },
        },
      },
      orderBy: { meetingDate: "desc" },
    });
  };

  export const getCellReportsByWorker = async (workerId: number) => {
    return prisma.cellReport.findMany({
      where: { workerId },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
          },
        },
        discipler: {
          select: {
            id: true,
            name: true,
          },
        },
        obreiro: {
            select: {
              id: true,
              name: true,
            },
          },
        
      },
      orderBy: { meetingDate: "desc" },
    });
  };

  export const getCellReportsByPastor = async (pastorId: number) => {
    return prisma.cellReport.findMany({
      where: { pastorId },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
          },
        },
        discipler: {
          select: {
            id: true,
            name: true,
          },
        },
        obreiro: {
            select: {
              id: true,
              name: true,
            },
          },
          pastor: {
            select: {
              id: true,
              name: true,
            },
          },
      },
      orderBy: { meetingDate: "desc" },
    });
  };
  
