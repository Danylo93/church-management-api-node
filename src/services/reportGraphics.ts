import { format, startOfMonth, endOfMonth } from "date-fns"; // Para manipulação de datas
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export const getMonthlyReport = async (month: number, year: number) => {
  const startOfMonthDate = startOfMonth(new Date(year, month - 1));
  const endOfMonthDate = endOfMonth(new Date(year, month - 1));

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
          name: true,
        },
      },
    },
  });

  // Retorna valores padrão se não houver relatórios no período
  if (!reports.length) {
    return {
      month: `${year}-${String(month).padStart(2, '0')}`,
      leaderName: null,
      totalMembers: 0, // Corrigido para totalMembers
      averageMembers: 0,
      averageAttendees: 0,
      averageVisitors: 0,
    };
  }

  let totalMembers = 0;
  let totalAttendees = 0;
  let totalVisitors = 0;

  reports.forEach((report) => {
    // Contando membros presentes
    const membersCount = Array.isArray(report.membersPresent) ? report.membersPresent.length : 0;
    totalMembers += membersCount;

    // Contando participantes
    const attendeesCount = Array.isArray(report.attendees) ? report.attendees.length : 0;
    totalAttendees += attendeesCount;

    // Contando visitantes
    totalVisitors += report.visitors || 0; // Assumindo que visitantes é um número ou null
  });

  const reportCount = reports.length;

  return {
    month: `${year}-${String(month).padStart(2, '0')}`,
    leaderName: reports[0].leader?.name || 'Líder não encontrado',
    averageMembers: Math.round(totalMembers / reportCount),
    averageAttendees: Math.round(totalAttendees / reportCount),
    averageVisitors: Math.round(totalVisitors / reportCount),
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
    totalMembers += Array.isArray(report.membersPresent) ? report.membersPresent.reduce((sum, val) => sum + val, 0) : report.membersPresent;
    totalAttendees += Array.isArray(report.attendees) ? report.attendees.reduce((sum, val) => sum + val, 0) : report.attendees;
    totalVisitors += Array.isArray(report.visitors) ? report.visitors.reduce((sum, val) => sum + val, 0) : report.visitors;
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
    totalMembers += Array.isArray(report.membersPresent) ? report.membersPresent.reduce((sum, val) => sum + val, 0) : report.membersPresent;
  totalAttendees += Array.isArray(report.attendees) ? report.attendees.reduce((sum, val) => sum + val, 0) : report.attendees;
  totalVisitors += Array.isArray(report.visitors) ? report.visitors.reduce((sum, val) => sum + val, 0) : report.visitors;
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

export const getMonthlyReportByPastor = async (
  pastorId: string,
  month: number,
  year: number
) => {
  // Define o intervalo do mês
  const startOfMonthDate = new Date(year, month - 1, 1);
  const endOfMonthDate = new Date(year, month, 0);

  // Busca os discipuladores associados ao pastor
  const disciplers = await prisma.user.findMany({
    where: { pastorId: Number(pastorId), role: "Discipulador" },
    select: { id: true, name: true },
  });

  // Busca os obreiros associados ao pastor
  const obreiros = await prisma.user.findMany({
    where: { pastorId: Number(pastorId), role: "Obreiro" },
    select: { id: true, name: true },
  });

  // Busca os líderes associados aos discipuladores
  const leaders = await prisma.user.findMany({
    where: { discipuladorId: { in: disciplers.map((d) => d.id) }, role: "Líder" },
    select: { id: true, name: true },
  });

  // Busca os relatórios de células no intervalo do mês
  const reports = await prisma.cellReport.findMany({
    where: {
      meetingDate: {
        gte: startOfMonthDate,
        lte: endOfMonthDate,
      },
      pastorId: Number(pastorId), // Garante que o relatório seja do pastor atual
    },
    select: {
      membersPresent: true,
      attendees: true,
      visitors: true,
    },
  });

  // Verifica se há relatórios
  if (reports.length === 0) {
    return {
      month: `${year}-${String(month).padStart(2, "0")}`,
      pastorId,
      pastorName: (await prisma.user.findUnique({
        where: { id: Number(pastorId) },
        select: { name: true },
      }))?.name || "Desconhecido",
      averageMembers: 0,
      averageAttendees: 0,
      averageVisitors: 0,
      leaders: leaders.map((leader) => leader.name),
      disciplers: disciplers.map((discipler) => discipler.name),
      obreiros: obreiros.map((obreiro) => obreiro.name),
    };
  }

  // Calcula os totais para médias
  const totalMembers = reports.reduce((sum, report) => sum + (Array.isArray(report.membersPresent) ? report.membersPresent.length : report.membersPresent), 0);
  const totalAttendees = reports.reduce((sum, report) => sum + (Array.isArray(report.attendees) ? report.attendees.length : report.attendees), 0);
  const totalVisitors = reports.reduce((sum, report) => sum + (Array.isArray(report.visitors) ? report.visitors.length : report.visitors), 0);
  
  const reportCount = reports.length;

  return {
    month: `${year}-${String(month).padStart(2, "0")}`,
    pastorId,
    pastorName: (await prisma.user.findUnique({
      where: { id: Number(pastorId) },
      select: { name: true },
    }))?.name || "Desconhecido",
    averageMembers: Math.round(totalMembers / reportCount),
    averageAttendees: Math.round(totalAttendees / reportCount),
    averageVisitors: Math.round(totalVisitors / reportCount),
    leaders: leaders.map((leader) => leader.name),
    disciplers: disciplers.map((discipler) => discipler.name),
    obreiros: obreiros.map((obreiro) => obreiro.name),
  };
};



