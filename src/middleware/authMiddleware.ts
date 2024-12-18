import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  name?: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
  discipulador?: {
    id: number;
    name: string;
  };
  obreiro?: {
    id: number;
    name: string;
  };
  pastor?: {
    id: number;
    name: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  jwt.verify(token, process.env.JWT_SECRET || '3f8dcb8b7bb7b9f8b5b4f95c6c7489e6b49d420315a469d9cf8c36fef8d1c743', async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido', error: err.message });
    }

    const user = decoded as JwtPayload;

    try {
      const userFromDb = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
          discipulador: { select: { id: true, name: true } },
          obreiro: { select: { id: true, name: true } },
          pastor: { select: { id: true, name: true } },
        },
      });

      if (!userFromDb) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      req.user = {
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        role: userFromDb.role,
        discipulador: userFromDb.discipulador || undefined,
        obreiro: userFromDb.obreiro || undefined,
        pastor: userFromDb.pastor || undefined,
      };

      next();
    } catch (error) {
      console.error('Erro ao buscar usuário no banco de dados', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });
};


export default authenticateToken;
