import { format, startOfMonth, endOfMonth } from "date-fns"; // Para manipulação de datas
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getMonthlyReport = async (month: number, year: number) => {
  // Buscar os relatórios do mês e ano fornecidos
  const startOfMonthDate = new Date(year, month - 1, 1); // Primeira data do mês
  const endOfMonthDate = new Date(year, month, 0); // Última data do mês

  const reports = await prisma.cellReport.findMany({
    where: {
      meetingDate: {
        gte: startOfMonthDate,
        lte: endOfMonthDate,
      },
      
    },
    
    select: {
      meetingDate: true,
      membersPresent: true,
      attendees: true,
      visitors: true,
      leader: {
        select: {
          name: true, // Nome do líder
        },
      },
    },
  });

  // Calcular as somas e médias de membros e frequentadores
  let totalMembers = 0;
  let totalAttendees = 0;
  let totalVisitors = 0;
  let reportCount = 0;
  let leaderName = reports[0]?.leader?.name || "Líder não encontrado"; // Obtém o nome do líder


  reports.forEach((report) => {
    totalMembers += report.membersPresent;
    totalAttendees += report.attendees;
    totalVisitors += report.visitors;
    reportCount += 1;
  });

  // Calcular as médias e arredondar para inteiro
  const averageMembers = reportCount ? Math.round(totalMembers / reportCount) : 0;
  const averageAttendees = reportCount ? Math.round(totalAttendees / reportCount) : 0;
  const averageVisitors = reportCount ? Math.round(totalVisitors / reportCount) : 0;

  return {
    month: `${year}-${String(month).padStart(2, '0')}`,
    leaderName,
    averageMembers,
    averageAttendees,
    averageVisitors,
  };
};


export const getMonthlyReportByDiscipulador = async (
  discipuladorId: string,
  month: number,
  year: number
) => {
  // Define o intervalo de datas do mês
  const startOfMonthDate = new Date(year, month - 1, 1); // Primeira data do mês
  const endOfMonthDate = new Date(year, month, 0); // Última data do mês

  // Busca os IDs de líderes associados ao discipulador
  const leaders = await prisma.user.findMany({
    where: { discipuladorId: Number(discipuladorId) }, // Certifique-se de que o discipuladorId é do tipo correto
    select: { id: true },
  });

  const leaderIds = leaders.map((leader) => leader.id);

  // Busca relatórios do mês filtrados pelo discipulador
  const reports = await prisma.cellReport.findMany({
    where: {
      meetingDate: {
        gte: startOfMonthDate,
        lte: endOfMonthDate,
      },
      leaderId: {
        in: leaderIds, // Filtra pelos IDs dos líderes
      },
    },
    select: {
      meetingDate: true,
      membersPresent: true,
      attendees: true,
      visitors: true,
      leaderId: true,
    },
  });

  // Busca o nome do discipulador
  const discipulador = await prisma.user.findUnique({
    where: { id: Number(discipuladorId) },
    select: { name: true },
  });

  // Verifica se há relatórios
  if (reports.length === 0) {
    return {
      month: `${year}-${String(month).padStart(2, "0")}`,
      discipuladorId,
      discipuladorName: discipulador?.name || null, // Nome do discipulador
      averageMembers: 0,
      averageAttendees: 0,
      averageVisitors: 0,
      leaders: [],
    };
  }

  // Inicializa variáveis para somas e cálculo
  let totalMembers = 0;
  let totalAttendees = 0;
  let totalVisitors = 0;
  let reportCount = 0;
  const uniqueLeaderIds = new Set<number>(); // Para armazenar os IDs dos líderes únicos

  reports.forEach((report) => {
    totalMembers += report.membersPresent;
    totalAttendees += report.attendees;
    totalVisitors += report.visitors;
    reportCount += 1;

    if (report.leaderId) {
      uniqueLeaderIds.add(report.leaderId); // Adiciona o ID do líder à lista
    }
  });

  // Busca os nomes dos líderes a partir dos IDs únicos
  const leaderNames = await prisma.user.findMany({
    where: { id: { in: Array.from(uniqueLeaderIds) } },
    select: { name: true },
  });

  // Calcula as médias e arredonda para inteiro
  const averageMembers = reportCount ? Math.round(totalMembers / reportCount) : 0;
  const averageAttendees = reportCount ? Math.round(totalAttendees / reportCount) : 0;
  const averageVisitors = reportCount ? Math.round(totalVisitors / reportCount) : 0;

  return {
    month: `${year}-${String(month).padStart(2, "0")}`,
    discipuladorId,
    discipuladorName: discipulador?.name || null, // Nome do discipulador
    averageMembers,
    averageAttendees,
    averageVisitors,
    leaders: leaderNames.map((leader) => leader.name), // Converte para um array de nomes
  };
};


export const getMonthlyWorkerReport = async (
  workerId: string,
  month: number,
  year: number
) => {
  const startOfMonthDate = new Date(year, month - 1, 1);
  const endOfMonthDate = new Date(year, month, 0);

  const reports = await prisma.cellReport.findMany({
    where: {
      meetingDate: {
        gte: startOfMonthDate,
        lte: endOfMonthDate,
      },
      leaderId: {
        in: (
          await prisma.user.findMany({
            where: {
              discipuladorId: {
                in: (
                  await prisma.user.findMany({
                    where: { obreiroId: Number(workerId) },
                    select: { id: true },
                  })
                ).map((discipler) => discipler.id),
              },
            },
            select: { id: true },
          })
        ).map((leader) => leader.id),
      },
    },
    select: {
      meetingDate: true,
      membersPresent: true,
      attendees: true,
      visitors: true,
      leaderId: true,
    },
  });

  if (reports.length === 0) {
    return {
      month: `${year}-${String(month).padStart(2, "0")}`,
      workerId,
      workerName: (await prisma.user.findUnique({ where: { id: Number(workerId) }, select: { name: true } }))?.name || "Desconhecido",
      averageMembers: 0,
      averageAttendees: 0,
      averageVisitors: 0,
      leaders: [],
      disciplers: [],
    };
  }

  let totalMembers = 0;
  let totalAttendees = 0;
  let totalVisitors = 0;
  let reportCount = 0;
  const leaderIds = new Set<number>();
  const disciplerIds = new Set<number>();

  reports.forEach((report) => {
    totalMembers += report.membersPresent;
    totalAttendees += report.attendees;
    totalVisitors += report.visitors;
    reportCount += 1;

    if (report.leaderId) {
      leaderIds.add(report.leaderId);
    }
  });

  const leaderNames = await prisma.user.findMany({
    where: { id: { in: Array.from(leaderIds) } },
    select: { name: true, discipuladorId: true },
  });

  leaderNames.forEach((leader) => {
    if (leader.discipuladorId) {
      disciplerIds.add(leader.discipuladorId);
    }
  });

  const disciplerNames = await prisma.user.findMany({
    where: { id: { in: Array.from(disciplerIds) } },
    select: { name: true },
  });

  const worker = await prisma.user.findUnique({
    where: { id: Number(workerId) },
    select: { name: true },
  });

  const averageMembers = reportCount ? Math.round(totalMembers / reportCount) : 0;
  const averageAttendees = reportCount ? Math.round(totalAttendees / reportCount) : 0;
  const averageVisitors = reportCount ? Math.round(totalVisitors / reportCount) : 0;

  return {
    month: `${year}-${String(month).padStart(2, "0")}`,
    workerId,
    workerName: worker?.name || "Desconhecido",
    averageMembers,
    averageAttendees,
    averageVisitors,
    leaders: leaderNames.map((leader) => leader.name),
    disciplers: disciplerNames.map((discipler) => discipler.name),
  };
};
