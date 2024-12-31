import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Para criptografar a senha

const prisma = new PrismaClient();

interface MemberData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  photo?: string;
  role: "membro" | "frequentador";
  leaderId: number; // ID do líder que está criando o membro
  cellId: number; // ID da célula onde o membro será inserido
}

export const createMemberService = async (memberData: MemberData) => {
  const { leaderId, cellId, ...memberInfo } = memberData;

  try {
    // Verifica se o role é válido
    if (!["membro", "frequentador"].includes(memberData.role)) {
      throw new Error("O campo 'role' deve ser 'membro' ou 'frequentador'.");
    }

    // Verifica se o líder existe
    const leader = await prisma.user.findUnique({
      where: { id: leaderId },
    });

    if (!leader || leader.role !== "Líder") {
      throw new Error("Líder inválido ou não encontrado.");
    }

    // Verifica se a célula existe
    // const cell = await prisma.cellReport.findUnique({
    //   where: { id: cellId },
    // });

    const cell = await prisma.cell.findUnique({
      where: { id: cellId },
    });
    
    console.log("Célula encontrada:", cell?.id);

    if (!cell) {
      console.error(`Célula não encontrada com ID: ${cellId}`);
      throw new Error("Célula não encontrada.");
    }

    // Gera uma senha temporária criptografada
    const temporaryPassword = "123456"; // Pode ser alterada ou gerada dinamicamente
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email: memberData.email },
    });
    
    if (existingUser) {
      throw new Error("O email fornecido já está em uso.");
    }

    // Prepara dados validados
    const memberInfoValidated = {
      ...memberInfo,
      phone: memberInfo.phone || null,
      address: memberInfo.address || null,
      photo: memberInfo.photo || null,
    };

    // Cria o membro com vínculo ao líder
    const newMember = await prisma.user.create({
      data: {
        ...memberInfoValidated,
        password: hashedPassword, // Adiciona a senha criptografada
        leaderId: leader.id, // Associar o novo membro ao líder
        discipuladorId: leader.discipuladorId, // Herdando o discipulador do líder
        obreiroId: leader.obreiroId, // Herdando o obreiro do líder
        pastorId: leader.pastorId, // Herdando o pastor do líder
        role: memberData.role, // Atribuindo o papel ao novo membro
      },
    });

    
    return newMember; // Retorna o membro criado
  } catch (error) {
    console.error("Erro ao criar membro:", error);
    throw new Error(`Erro ao criar o membro: ${error || error}`);
  }
};


export const getCellMembers = async (leaderId: number) => {
    try {
      // Buscar usuários com a role de "membro" associados ao líder
      const members = await prisma.user.findMany({
        where: {
          role: 'membro',
            leaderId: leaderId
        },
      });
  
      return members; // Retorna os membros encontrados
    } catch (error) {
      throw new Error('Erro ao buscar membros da célula');
    }
  };

  export const getCellAttendes = async (leaderId: number) => {
    try {
      // Buscar usuários com a role de "membro" associados ao líder
      const attendees = await prisma.user.findMany({
        where: {
          role: 'frequentador',
            leaderId: leaderId
        },
      });
  
      return attendees; // Retorna os membros encontrados
    } catch (error) {
      throw new Error('Erro ao buscar frequentadores da célula');
    }
  };