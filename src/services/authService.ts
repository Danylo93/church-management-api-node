import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

const prisma = new PrismaClient();

// Configuração do JWT
const JWT_SECRET = process.env.JWT_SECRET || "3f8dcb8b7bb7b9f8b5b4f95c6c7489e6b49d420315a469d9cf8c36fef8d1c743";

// Função para validar a senha usando bcrypt
const validatePassword = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, storedPassword); // Comparando as senhas hashadas
};

export const loginUserService = async (email: string, password: string) => {
  try {
    // Verifica se o usuário existe no banco de dados do app
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Erro específico: usuário não encontrado
      throw { status: 404, message: "Usuário não encontrado. Verifique o email informado." };
    }

    // Consultar o status do tenant no SaaS
    const tenantSubdomain = user.tenantSubdomain; // Subdomínio do tenant

    // Consultar o status do tenant via API do SaaS
    const { data: tenantStatus } = await axios.get(
      `http://localhost:5000/api/tenants/status/${tenantSubdomain}`  // Altere o URL para o endpoint do SaaS
    );

    // Verifica se o tenant está ativo
    if (!tenantStatus || tenantStatus.active !== true) {
      // Erro específico: plano do tenant inativo
      throw { status: 403, message: "O plano do tenant não está ativo. Acesso negado." };
    }

    // Verifica a senha do usuário
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // Erro específico: senha incorreta
      throw { status: 401, message: "Senha incorreta. Tente novamente." };
    }

    // Gera o token JWT para o usuário
    const token = jwt.sign(
      {
        userId: user.id,
        tenantSubdomain: user.tenantSubdomain,  // Usando o tenantSubdomain em vez do tenantId
        email: user.email
      },
      JWT_SECRET,  // Sua chave secreta do JWT
      { expiresIn: "1h" }  // Tempo de expiração do token
    );

    return { token };

  } catch (error: any) {
    // Captura de erros personalizados
    if (error.status && error.message) {
      throw { status: error.status, message: error.message };  // Repassando o erro com status e mensagem
    } else {
      // Erro geral de servidor ou outro tipo de erro
      console.error("Erro inesperado:", error);
      throw { status: 500, message: "Erro interno do servidor. Tente novamente mais tarde." };
    }
  }
};
