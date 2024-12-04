import { Request, Response } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getLeadersByDiscipler,
  getLeadersByWorker,
  getDisciplersByWorker,
} from "../services/userService";

// Função auxiliar para formatar erros
const handleError = (res: Response, error: any, customMessage: string) => {
  // Log do erro no servidor para debugging
  console.error(error);

  // Retornar um erro mais informativo
  if (error instanceof Error) {
    return res.status(400).json({ error: customMessage, details: error.message });
  } else {
    return res.status(500).json({ error: "Erro interno do servidor", details: error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error, "Erro ao registrar o usuário.");
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await updateUser(Number(id), req.body);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.json(user);
  } catch (error) {
    handleError(res, error, "Erro ao editar o usuário.");
  }
};

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    handleError(res, error, "Erro ao listar usuários.");
  }
};

export const listLeadersByDiscipler = async (req: Request, res: Response) => {
  try {
    const { disciplerId } = req.params;
    const leaders = await getLeadersByDiscipler(Number(disciplerId));

    if (!leaders || leaders.length === 0) {
      return res.status(404).json({ message: "Nenhum líder encontrado para esse discipulador." });
    }

    res.json(leaders);
  } catch (error) {
    handleError(res, error, "Erro ao listar líderes por discipulador.");
  }
};

export const listLeadersByWorker = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.params;
    const leaders = await getLeadersByWorker(Number(workerId));

    if (!leaders || leaders.length === 0) {
      return res.status(404).json({ message: "Nenhum líder encontrado para esse obreiro." });
    }

    res.json(leaders);
  } catch (error) {
    handleError(res, error, "Erro ao listar líderes por obreiro.");
  }
};

export const listDisciplersByWorker = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.params;
    const disciplers = await getDisciplersByWorker(Number(workerId));

    if (!disciplers || disciplers.length === 0) {
      return res.status(404).json({ message: "Nenhum discipulador encontrado para esse obreiro." });
    }

    res.json(disciplers);
  } catch (error) {
    handleError(res, error, "Erro ao listar discipuladores por obreiro.");
  }
};
