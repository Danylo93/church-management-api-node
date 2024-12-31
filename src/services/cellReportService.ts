import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface CreateReportParams {
  leaderId: number;
  disciplerId: number;
  pastorId: number;
  workerId: number;
  meetingDate: string;
  membersPresent: number;
  attendees: number;
  visitors: number;
  additionalInfo?: string;
  cellPhase?: string;
  multiplicationDate?: string;
}

export const createCellReport = async (data: CreateReportParams) => {
  const {
    leaderId,
    disciplerId,
    pastorId,
    workerId,
    meetingDate,
    membersPresent,
    attendees,
    visitors,
    additionalInfo,
    cellPhase,
    multiplicationDate,
  } = data;

  // Buscar o nome do líder a partir da tabela user
  const leader = await prisma.user.findUnique({
    where: { id: leaderId },
    select: { name: true },  // Selecionando apenas o nome do líder
  });

  if (!leader) {
    throw new Error("Líder não encontrado");
  }

  // Verificar se já existe uma célula para o líder
  let cell = await prisma.cell.findFirst({
    where: { leaderId },
  });

  // Criar a célula se não existir
  if (!cell) {
    cell = await prisma.cell.create({
      data: {
        name: `Célula do Líder ${leader.name}`, // Usando o nome do líder
        address: "Endereço não informado",
        leaderId,
        disciplerId,
        pastorId,
        obreiroId: workerId,
        attendees: attendees || 0,
        members: membersPresent || 0,
      },
    });
  }

  // Criar o relatório vinculado à célula
  const report = await prisma.cellReport.create({
    data: {
      meetingDate,
      membersPresent,
      attendees,
      visitors,
      additionalInfo,
      cellPhase,
      multiplicationDate,
      leaderId,
      disciplerId,
      pastorId,
      workerId,
      cellName: cell.name, // Associar ao nome da célula existente
    },
  });

  return { report, cell };
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
  
