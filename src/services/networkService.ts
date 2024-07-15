import { PrismaClient, NetworkObreiro, NetworkDiscipulador, Cell } from '@prisma/client';

const prisma = new PrismaClient();

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

export const createCell = async (
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
      leader: true, // Inclui dados do líder, se necessário
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

// Soma de membros e frequentadores por Líder de Célula
export const sumMembersAndAttendeesByLeader = async (leaderId: number) => {
  const cells = await prisma.cell.findMany({
    where: { leaderId },
  });

  const totalMembers = cells.reduce((sum, cell) => sum + cell.quantityMembers, 0);
  const totalAttendees = cells.reduce((sum, cell) => sum + cell.quantityAttendees, 0);

  return { totalMembers, totalAttendees };
};

// Soma de membros e frequentadores por Discipulador
export const sumMembersAndAttendeesByDiscipulador = async (discipuladorId: number) => {
  const cells = await prisma.cell.findMany({
    where: { discipuladorId },
  });

  const totalMembers = cells.reduce((sum, cell) => sum + cell.quantityMembers, 0);
  const totalAttendees = cells.reduce((sum, cell) => sum + cell.quantityAttendees, 0);

  return { totalMembers, totalAttendees };
};

// Soma de membros e frequentadores por Obreiro
export const sumMembersAndAttendeesByObreiro = async (obreiroId: number) => {
  const cells = await prisma.cell.findMany({
    where: { obreiroId },
  });

  const totalMembers = cells.reduce((sum, cell) => sum + cell.quantityMembers, 0);
  const totalAttendees = cells.reduce((sum, cell) => sum + cell.quantityAttendees, 0);

  return { totalMembers, totalAttendees };
};

// Soma de membros e frequentadores por Pastor
export const sumMembersAndAttendeesByPastor = async (pastorId: number) => {
  const cells = await prisma.cell.findMany({
    where: { pastorId },
  });

  const totalMembers = cells.reduce((sum, cell) => sum + cell.quantityMembers, 0);
  const totalAttendees = cells.reduce((sum, cell) => sum + cell.quantityAttendees, 0);

  return { totalMembers, totalAttendees };
};
