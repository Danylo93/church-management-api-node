// src/@types/express.d.ts
import { IUser } from '../models/User'; // ajuste o caminho conforme necessário

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // ou IUser | undefined, dependendo da sua lógica
    }
  }
}
