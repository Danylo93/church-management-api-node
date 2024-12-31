import { Request, Response } from "express";
import { createMemberService, getCellMembers } from "../services/memberService";

export const createMemberController = async (req: Request, res: Response) => {
    try {
      const memberData = req.body;
  
      // Valida os dados de entrada
      if (!memberData.name || !memberData.email || !memberData.leaderId || !memberData.cellId || !memberData.role) {
        return res.status(400).json({
          error: "Os campos nome, email, leaderId, cellId e role são obrigatórios.",
        });
      }
  
      // Chama o serviço para criar o membro
      const newMember = await createMemberService(memberData);
  
      res.status(201).json({
        message: "Membro criado com sucesso!",
        member: newMember,
      });
    } catch (error) {
      console.error("Erro no controller ao criar membro:", error);
      res.status(500).json({
        error: "Erro ao criar membro.",
        details: error,
      });
    }
  };

export const listCellMembers = async (req: Request, res: Response) => {
    const { leaderId } = req.params;
  
    try {
      const members = await getCellMembers(parseInt(leaderId));
  
      if (members.length === 0) {
        return res.status(404).json({ message: 'Nenhum membro encontrado para o líder especificado' });
      }
  
      return res.status(200).json(members);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao listar membros da célula' });
    }
  };