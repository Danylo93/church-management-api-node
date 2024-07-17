// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/User';

interface DecodedToken extends JwtPayload {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as DecodedToken;
    req.user = { id: decoded.id, role: decoded.role } as unknown as IUser;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};
