import { PrismaClient, NetworkObreiro, NetworkDiscipulador, Cell } from '@prisma/client';

const prisma = new PrismaClient();


export const getLeadersByDiscipulador = async (discipuladorId: number) => {
  const discipulador = await prisma.user.findUnique({
    where: { id: discipuladorId },
    include: {
      cells: {
        include: {
          leader: true, // Inclui os líderes associados às células do discipulador
        },
      },
    },
  });

  if (!discipulador) {
    throw new Error('Discipulador not found');
  }

  // Extrai os nomes dos líderes das células associadas
  const leaderNames = discipulador.cells
    .map(cell => cell.leader?.name) // Extrai apenas o nome do líder
    .filter(name => name); // Filtra valores falsy (por exemplo, null ou undefined)
  
  // Remove duplicatas usando um Set e retorna uma lista de nomes únicos
  return [...new Set(leaderNames)];
};

export const getDiscipuladorByObreiro = async (obreiroId: number) => {
  const obreiro = await prisma.user.findUnique({
    where: { id: obreiroId },
    include: {
      cells: {
        include: {
          discipulador: true, // Inclui os discipuladores associados às células do obreiro
        },
      },
    },
  });

  if (!obreiro) {
    throw new Error('Obreiro not found');
  }

  // Extrai os discipuladores das células associadas
  const discipuladorNames = obreiro.cells
    .map(cell => cell.discipulador?.name) // Extrai apenas o nome do discipulador
    .filter(name => name); // Filtra valores falsy (por exemplo, null ou undefined)
  
  // Remove duplicatas usando um Set e retorna uma lista de nomes únicos
  return [...new Set(discipuladorNames)];
};




export const createNetworkObreiro = async (pastorId: number, obreiroId: number, name: string, quantityCells: number, quantityMembers: number, quantityAttendees: number): Promise<NetworkObreiro> => {
  return prisma.networkObreiro.create({
    data: {
      pastorId,
      obreiroId,
      name,
      quantityCells,
      quantityMembers,
      quantityAttendees,
    },
  });
};

export const createNetworkDiscipulador = async (obreiroId: number, discipuladorId: number, name: string, quantityMembers: number, quantityAttendees: number): Promise<NetworkDiscipulador> => {
  return prisma.networkDiscipulador.create({
    data: {
      obreiroId,
      discipuladorId,
      name,
      quantityMembers,
      quantityAttendees,
    },
  });
};

export const createReportLeader = async (
  discipuladorId: number,
  leaderId: number,
  name: string,
  quantityMembers: number,
  quantityAttendees: number,
  date: Date,
  address: string,
  obreiroId: number,
  pastorId: number,
  quantityGuardAngels: number,
  quantityNotConsolidated: number,
  quantityMaturityCourse: number,
  quantityCLTCourse: number,
  quantityNotConsolidatedMeeting: number,
  cellPhase: string,
  multiplicationDate: Date
): Promise<Cell> => {
  return prisma.cell.create({
    data: {
      discipuladorId,
      leaderId,
      name,
      quantityMembers,
      quantityAttendees,
      date,
      address,
      obreiroId,
      pastorId,
      quantityGuardAngels,
      quantityNotConsolidated,
      quantityMaturityCourse,
      quantityCLTCourse,
      quantityNotConsolidatedMeeting,
      cellPhase,
      multiplicationDate,
    },
  });
};

interface Report {
  id: number;
  cellId: number;
  leaderId: number;
  discipuladorId: number;
  obreiroId: number;
  pastorId: number;
  date: Date;
  location: string | null;
  quantityMembers: number | null;
  quantityAttendees: number | null;
  quantityNotConsolidated: number | null;
  quantityGuardAngels: number | null;
  quantityCLTCourse: number | null;
  quantityNotConsolidatedMeeting: number | null;
}
// reportService.ts

export const sendReportToObreiro = async (
  discipuladorId: number,
  obreiroId: number,
  pastorId: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const recentReport = await prisma.report.findFirst({
      where: {
        AND: [
          { discipuladorId },
          { obreiroId },
          { pastorId },
          {
            date: {
              gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Data dos últimos 7 dias
            },
          },
        ],
      },
    });

    if (recentReport) {
      return { success: false, message: 'Já foi enviado um relatório para este obreiro e pastor nos últimos 7 dias.' };
    }

    const cells = await prisma.cell.findMany({
      where: { discipuladorId },
    });

    if (!cells.length) {
      throw new Error('No cells found for the given discipulador');
    }

    await Promise.all(
      cells.map(cell =>
        prisma.report.create({
          data: {
            cellId: cell.id,
            leaderId: cell.leaderId,
            discipuladorId,
            obreiroId,
            pastorId,
            date: new Date(),
            location: cell.address || '',
            quantityMembers: cell.quantityMembers,
            quantityAttendees: cell.quantityAttendees,
            quantityNotConsolidated: cell.quantityNotConsolidated || 0,
            quantityGuardAngels: cell.quantityGuardAngels || 0,
            quantityCLTCourse: cell.quantityCLTCourse || 0,
            quantityNotConsolidatedMeeting: cell.quantityNotConsolidatedMeeting || 0,
          },
        })
      )
    );

    return { success: true, message: 'Relatório enviado com sucesso' };
  } catch (error) {
    console.error('Error sending reports to Obreiro:', error);
    throw new Error('Failed to send reports to Obreiro');
  }
};

// reportService.ts

export const getReportsByDiscipulador = async (discipuladorId: number) => {
  try {
    const cells = await prisma.cell.findMany({
      where: { discipuladorId },
    });

    if (!cells.length) {
      throw new Error('No cells found for the given discipulador');
    }

    const reports = await Promise.all(
      cells.map(async (cell) => {
        const reportsForCell = await prisma.report.findMany({
          where: { cellId: cell.id },
        });

        return {
          cell: {
            id: cell.id,
            name: cell.name || 'Unknown Cell',
            address: cell.address || 'Unknown Address',
          },
          reports: reportsForCell.map((report) => ({
            id: report.id,
            date: report.date,
            location: report.location,
            quantityMembers: report.quantityMembers,
            quantityAttendees: report.quantityAttendees,
            quantityNotConsolidated: report.quantityNotConsolidated,
            quantityGuardAngels: report.quantityGuardAngels,
            quantityCLTCourse: report.quantityCLTCourse,
            quantityNotConsolidatedMeeting: report.quantityNotConsolidatedMeeting,
          })),
        };
      })
    );

    return {
      discipulador: `Discipulador ${discipuladorId}`, // Or fetch discipulador details if needed
      reports,
    };
  } catch (error) {
    console.error('Error getting reports by discipulador:', error);
    throw new Error('Failed to get reports by discipulador');
  }
};


export const getAverageMembersAndAttendeesByDiscipulador = async (discipuladorId: number) => {
  try {
    // Encontrar todos os relatórios associados ao discipulador
    const reports = await prisma.report.findMany({
      where: { discipuladorId },
      select: {
        quantityMembers: true,
        quantityAttendees: true,
      },
    });

    if (reports.length === 0) {
      return { averageMembers: 0, averageAttendees: 0 };
    }

    // Calcular a média de membros e frequentadores
    const totalMembers = reports.reduce((sum, report) => sum + (report.quantityMembers || 0), 0);
    const totalAttendees = reports.reduce((sum, report) => sum + (report.quantityAttendees || 0), 0);

    const averageMembers = totalMembers / reports.length;
    const averageAttendees = totalAttendees / reports.length;

    return { averageMembers, averageAttendees };
  } catch (error) {
    console.error('Error calculating averages:', error);
    throw new Error('Failed to calculate averages');
  }
};

export const updateCell = async (
  cellId: number,
  discipuladorId: number,
  leaderId: number,
  name: string,
  quantityMembers: number,
  quantityAttendees: number,
  date: Date,
  address: string,
  obreiroId: number,
  pastorId: number,
  quantityGuardAngels: number,
  quantityNotConsolidated: number,
  quantityMaturityCourse: number,
  quantityCLTCourse: number,
  quantityNotConsolidatedMeeting: number,
  cellPhase: string,
  multiplicationDate: Date
): Promise<Cell> => {
  return prisma.cell.update({
    where: { id: cellId },
    data: {
      discipuladorId,
      leaderId,
      name,
      quantityMembers,
      quantityAttendees,
      date,
      address,
      obreiroId,
      pastorId,
      quantityGuardAngels,
      quantityNotConsolidated,
      quantityMaturityCourse,
      quantityCLTCourse,
      quantityNotConsolidatedMeeting,
      cellPhase,
      multiplicationDate,
    },
  });
};

export const listObreiros = async () => {
  return await prisma.user.findMany({
    where: { role: 'Obreiro' },
  });
};

export const listDiscipuladores = async () => {
  return await prisma.user.findMany({
    where: { role: 'Discipulador' },
  });
};

export const listLideres = async () => {
  return await prisma.user.findMany({
    where: { role: 'Líder' },
  });
};

export const listPastores = async () => {
  return await prisma.user.findMany({
    where: {role: 'Pastor'}
  })
}

export const getCellsByDiscipulador = async (discipuladorId: number) => {
  const cells = await prisma.cell.findMany({
    where: { discipuladorId },
    include: {
      leader: true,
    },
  });
  return cells;
};

export const getCellsByNetworkObreiro = async (networkObreiroId: number) => {
  const cells = await prisma.cell.findMany({
    where: {
      obreiroId: networkObreiroId,
    },
    include: {
      leader: true,
    },
  });
  return cells;
};

export const getCellsByPastor = async (pastorId: number) => {
  const cells = await prisma.cell.findMany({
    where: {
      pastorId,
    },
    include: {
      leader: true,
    },
  });
  return cells;
};

export const getCellsByLeader = async (leaderId: number) => {
  const cells = await prisma.cell.findMany({
    where: {
      leaderId,
    },
    include: {
      leader: true,
    },
  });
  return cells;
};



export const listRecentCellsByLeader = async (leaderId: number) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const cells = await prisma.cell.findMany({
    where: {
      leaderId: leaderId,
      date: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      quantityMembers: true,
      quantityAttendees: true,
    },
  });

  const totalMembers = cells.reduce((sum, cell) => sum + cell.quantityMembers, 0);
  const totalAttendees = cells.reduce((sum, cell) => sum + cell.quantityAttendees, 0);

  return { totalMembers, totalAttendees };
};



export const deleteCell = async (cellId: number) => {
  const cell = await prisma.cell.findUnique({
    where: { id: cellId },
  });

  if (!cell) {
    throw new Error('Cell not found');
  }


  await prisma.cell.delete({
    where: { id: cellId },
  });
};
