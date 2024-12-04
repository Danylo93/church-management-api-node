import { Request, Response } from "express";
import { loginUserService } from "../services/authService"; // Importa o serviço de login

// Controller para login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validação de campos
    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    // Chama o serviço de login
    const result = await loginUserService(email, password);

    // Retorna o token gerado
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};


