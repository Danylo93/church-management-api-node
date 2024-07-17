import { PrismaClient } from '@prisma/client';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  obreiroNetwork?: string; 
  discipuladorNetwork?: string; 
  cellName?: string; 
  address?: string; 
  phone?: string; 
  photo?: string;
}

const prisma = new PrismaClient();

export const createUser = async (data: IUser) => {
  return await prisma.user.create({ data });
};

