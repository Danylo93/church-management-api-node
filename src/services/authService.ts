import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "./userService"; // Para consultar o usuário por email

const prisma = new PrismaClient();

// Configuração do JWT
const JWT_SECRET = process.env.JWT_SECRET || "3f8dcb8b7bb7b9f8b5b4f95c6c7489e6b49d420315a469d9cf8c36fef8d1c743";

// Função para validar a senha usando bcrypt
const validatePassword = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
  return bcrypt.compare(inputPassword, storedPassword); // Comparando as senhas hashadas
};

// Função para login
export const loginUserService = async (email: string, password: string) => {
  // Buscar o usuário no banco de dados
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Se o usuário não for encontrado
  if (!user) {
    throw new Error("Credenciais inválidas");
  }

  // Validar a senha fornecida
  const isPasswordValid = await validatePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Credenciais inválidas");
  }

  // Gerar o token JWT
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    message: "Login bem-sucedido",
    token,
  };
};
