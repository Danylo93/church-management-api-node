// src/services/userService.ts
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { deleteFromS3, uploadToS3 } from './s3';

const prisma = new PrismaClient();

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};


export const createUser = async (data: any) => {
  const { password, role, discipuladorId, obreiroId, pastorId } = data;

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

  // Hasheando a senha com bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criação do usuário com a senha hasheada
  return prisma.user.create({
    data: {
      ...data, // Mantém os outros campos
      password: hashedPassword, // Armazena a senha hasheada
    },
  });
};

export const updateUser = async (id: number, data: any) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const updateUserPhoto = async (userId: number, file: Express.Multer.File) => {
  // Recupera o usuário atual para pegar a URL da foto antiga
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  // Se já tiver uma foto, remova do S3
  if (user?.photo) {
    await deleteFromS3(user.photo);
  }

  // Faz o upload da nova foto para o S3
  const newPhotoUrl = await uploadToS3(file);

  // Atualiza o usuário no banco de dados com a nova URL da foto
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      photo: newPhotoUrl,
    },
  });

  return updatedUser;
};

export const deleteUser = async (id: number) => {
  await prisma.user.delete({
    where: { id },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany();
};

//Listar Lideres por Discipulador
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
    return `${leader.name}`;
  });
};

// Listar Líderes por Obreiro
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
    return `${leader.name}`;
  });
};

// Listar Discipuladores por Obreiro

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
    return `${discipler.name}`;
  });
};

export const getUserDetails = async (userId: number) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      phone: true,
      address: true,
      role: true,
      email: true,
      photo: true,

      discipulador: {
        select: {
          name: true,
        },
      },
      obreiro: {
        select: {
          name: true,
        },
      },
      pastor: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const getUsersByRole = async (role: string) => {
  if (!role) {
    throw new Error('O parâmetro "role" é obrigatório.');
  }

  // Busca no banco de dados usando Prisma
  const users = await prisma.user.findMany({
    where: {
      role, // Filtra pelo cargo fornecido
    },
  });

  return users;
};