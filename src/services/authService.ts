import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const register = async (name: string, email: string, password: string, role: string) => {
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1d' });
  return { user, token };
};
