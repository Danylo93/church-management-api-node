import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.includes((req.user as IUser).role)) {
      next();
    } else {
      return res.status(403).send({ error: 'Forbidden' });
    }
  };
};
