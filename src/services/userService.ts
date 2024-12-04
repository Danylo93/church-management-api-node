// src/services/userService.ts
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();


export const createUser = async (data: any) => {
  const { role, discipuladorId, obreiroId, pastorId } = data;

  // Validações de relacionamento
  if (role === "Líder" && (!discipuladorId || !obreiroId || !pastorId)) {
    throw new Error("Líder precisa de discipulador, obreiro e pastor.");
  }

  if (role === "Discipulador" && (!obreiroId || !pastorId)) {
    throw new Error("Discipulador precisa de obreiro e pastor.");
  }

  if (role === "Obreiro" && !pastorId) {
    throw new Error("Obreiro precisa de pastor.");
  }

  return prisma.user.create({ data });
};

export const updateUser = async (id: number, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({
    where: { id },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};

export const getLeadersByDiscipler = async (disciplerId: number) => {
  const leaders = await prisma.user.findMany({
    where: { discipuladorId: disciplerId, role: "Líder" },
    select: {
      name: true, // Nome do líder
      discipulador: {
        select: {
          name: true, // Nome do discipulador
        },
      },
    },
  });

  // Formata a resposta conforme o solicitado
  return leaders.map((leader) => {
    return `${leader.name} pertence à Rede do Discipulador ${leader.discipulador?.name}`;
  });
};


export const getLeadersByWorker = async (workerId: number) => {
  const leaders = await prisma.user.findMany({
    where: { obreiroId: workerId, role: "Líder" },
    select: {
      name: true, // Nome do líder
      discipulador: {
        select: {
          name: true, // Nome do discipulador
        },
      },
      obreiro: {
        select: {
          name: true, // Nome do obreiro
        },
      },
    },
  });

  // Formata a resposta conforme o solicitado
  return leaders.map((leader) => {
    return `${leader.name} pertence à Rede do Discipulador ${leader.discipulador?.name} que é da rede do Obreiro ${leader.obreiro?.name}`;
  });
};



export const getDisciplersByWorker = async (workerId: number) => {
  const disciplers = await prisma.user.findMany({
    where: { obreiroId: workerId, role: "Discipulador" },
    select: {
      name: true, // Nome do discipulador
      obreiro: {
        select: {
          name: true, // Nome do obreiro
        },
      },
    },
  });

  // Formata a resposta conforme o solicitado
  return disciplers.map((discipler) => {
    return `${discipler.name} pertence a Rede do Obreiro ${discipler.obreiro?.name}`;
  });
};

