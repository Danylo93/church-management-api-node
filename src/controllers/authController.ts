import { Request, Response } from 'express';
import { register as registerService, login as loginService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await registerService(name, email, password, role);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginService(email, password);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};
