import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCourses = async () => {
  return prisma.course.findMany();
};
