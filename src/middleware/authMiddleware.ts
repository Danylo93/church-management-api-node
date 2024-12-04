import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient(); // Instância do Prisma

// Interface para os dados do usuário no JWT
interface JwtPayload {
  userId: number; // Alterado de string para number, se o ID for numérico
  email: string;
  role: string;
  name?: string;
}

// Interface IUser para tipar `req.user`
interface IUser {
  id: number; // Alterado de string para number, se o ID for numérico
  name: string;
  email: string;
  role: string;
  // Outros campos relevantes para o usuário
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Aqui, estamos declarando que `req.user` pode ser um `IUser`
    }
  }
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  // Pega o token do cabeçalho Authorization
  const token = req.headers['authorization']?.split(' ')[1];

  // Se o token não existir
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  // Verifica o token
  jwt.verify(token, process.env.JWT_SECRET || '3f8dcb8b7bb7b9f8b5b4f95c6c7489e6b49d420315a469d9cf8c36fef8d1c743', async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido', error: err.message });
    }

    // Aqui estamos acessando a carga útil do JWT, assumindo que `decoded` seja um `JwtPayload`
    const user = decoded as JwtPayload;

    try {
      // Busca o usuário completo no banco de dados usando o email do payload do JWT
      const userFromDb = await prisma.user.findUnique({
        where: { email: user.email }, // Agora usamos o email do payload
        include: {
          // Exemplo de incluir dados relacionados, se necessário:
          // profile: true,
          // posts: true,
        },
      });

      if (!userFromDb) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Preenche o `req.user` com os dados completos do usuário
      req.user = {
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        role: userFromDb.role,
        // Adicione outros campos conforme necessário
      };

      next(); // Chama o próximo middleware ou rota
    } catch (error) {
      console.error('Erro ao buscar usuário no banco de dados', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });
};

export default authenticateToken;
