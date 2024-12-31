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
  
      // Valida o cellId
      const cell = await prisma.cellReport.findUnique({
        where: { id: cellId },
      });
  
      if (!cell) {
        throw new Error("Célula não encontrada.");
      }
  
      // Gera uma senha temporária criptografada
      const temporaryPassword = "123456"; // Pode ser alterada ou gerada dinamicamente
      const hashedPassword = await bcrypt.hash(temporaryPassword, 10);
  
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
  
      // Atualiza a célula para adicionar o novo membro como participante
      await prisma.cellReport.update({
        where: { id: cellId },
        data: {
          attendees: {
            increment: 1, // Incrementa o número de participantes na célula
          },
        },
      });
  
      return newMember; // Retorna o membro criado
    } catch (error) {
      console.error("Erro ao criar membro:", error);
      throw new Error(`Erro ao criar o membro: ${error}`);
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