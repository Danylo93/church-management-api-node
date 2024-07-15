import { PrismaClient } from '@prisma/client';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const prisma = new PrismaClient();

export const createUser = async (data: IUser) => {
  return await prisma.user.create({ data });
};

