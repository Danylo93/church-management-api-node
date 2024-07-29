// src/services/userService.ts
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUser = async (id: number, updates: Partial<User>): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data: updates,
  });
};

export const deleteUser = async (id: number): Promise<User | null> => {
  return prisma.user.delete({
    where: { id },
  });
};

export const listUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};


