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
    },
  });

  // Calcular as somas e médias de membros e frequentadores
  let totalMembers = 0;
  let totalAttendees = 0;
  let totalVisitors = 0;
  let reportCount = 0;

  reports.forEach((report) => {
    totalMembers += report.membersPresent;
    totalAttendees += report.attendees;
    totalVisitors += report.visitors;
    reportCount += 1;
  });

  // Calcular as médias
  const averageMembers = reportCount ? totalMembers / reportCount : 0;
  const averageAttendees = reportCount ? totalAttendees / reportCount : 0;
  const averageVisitors = reportCount ? totalVisitors / reportCount : 0;

  return {
    month: `${year}-${String(month).padStart(2, '0')}`,
    averageMembers,
    averageAttendees,
    averageVisitors,
  };
};
