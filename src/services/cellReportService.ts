import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

type CreateReportParams = {
  leaderId: number;
  disciplerId: number;
  address: string;
  pastorId: number;
  workerId: number;
  meetingDate: Date;
  membersPresent: number[]; // Alterando para um array de números
  attendees: number[]; // Alterando para um array de números
  visitors: number;
  additionalInfo: string;
  cellPhase: string;
  multiplicationDate: Date;
};


export const createCellReport = async (data: CreateReportParams) => {
  const {
    leaderId,
    disciplerId,
    address,
    pastorId,
    workerId,
    meetingDate,
    membersPresent, // Lista de membros presentes (IDs)
    attendees, // Lista de frequentadores presentes (IDs)
    visitors,
    additionalInfo,
    cellPhase,
    multiplicationDate,
  } = data;

  // Buscar o nome do líder a partir da tabela user
  const leader = await prisma.user.findUnique({
    where: { id: leaderId },
    select: { name: true }, // Selecionando apenas o nome do líder
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
        address,
        leaderId,
        disciplerId,
        pastorId,
        obreiroId: workerId,
        attendees: 0, // Inicializando com 0
        members: 0, // Inicializando com 0
        visitors: 0,
      },
    });
  }

  // Validar os membros presentes
  const members = await prisma.user.findMany({
    where: {
      id: {
        in: membersPresent, // IDs dos membros presentes
      },
      role: {
        in: ["membro", "Líder"], // Garantir que são membros ou líderes
      },
    },
  });

  // Comparar se o número de membros encontrados corresponde ao número de IDs passados
  if (members.length !== membersPresent.length) {
    throw new Error("Alguns membros não foram encontrados.");
  }

  // Validar os frequentadores presentes
  const frequenters = await prisma.user.findMany({
    where: {
      id: {
        in: attendees, // IDs dos frequentadores presentes
      },
      role: "frequentador", // Garantir que são frequentadores
    },
  });

  // Comparar se o número de frequentadores encontrados corresponde ao número de IDs passados
  if (frequenters.length !== attendees.length) {
    throw new Error("Alguns frequentadores não foram encontrados.");
  }

  // Atualiza a célula com o número de membros e frequentadores presentes
  const updatedCell = await prisma.cell.update({
    where: { id: cell.id },
    data: {
      members: members.length, // Atualiza com o número de membros presentes
      attendees: frequenters.length, // Atualiza com o número de frequentadores presentes
      visitors: visitors
    },
  });

  // Criar o relatório vinculado à célula
  const report = await prisma.cellReport.create({
    data: {
      meetingDate,
      membersPresent, // Agora é a lista de IDs dos membros presentes
      attendees, // Agora é a lista de IDs dos frequentadores presentes
      visitors,
      additionalInfo,
      cellPhase,
      multiplicationDate,
      leaderId,
      disciplerId,
      pastorId,
      workerId,
      cellName: updatedCell.name, // Associar ao nome da célula existente
    },
  });

  return { report, cell: updatedCell };
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
  
