// src/@types/express.d.ts
import { IUser } from '../models/User'; // ajuste o caminho conforme necessário

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId?: number;
      tenantSubdomain?: string;
      prisma?: import('@prisma/client').PrismaClient;
    }
  }
}
