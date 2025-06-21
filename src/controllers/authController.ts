import { Request, Response } from "express";
import { loginUserService } from "../services/authService"; // Importa o serviço de login

// Controller para login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validação de campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        message: "Email e senha são obrigatórios",
      });
    }

    // Chama o serviço de login para o usuário
    const result = await loginUserService(email, password);

    // Retorna o token JWT gerado
    return res.json({
      message: "Login bem-sucedido",
      token: result.token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || "Erro interno do servidor" });
  }
};

