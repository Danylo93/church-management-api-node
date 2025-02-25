import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserStatusService {
  async setUserStatus(userId: number, isOnline: boolean) {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { isOnline },
      });
    } catch (error) {
      console.error('Error in setUserStatus:', error);
      throw error;
    }
  }

  async getUserStatus(userId: number) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { isOnline: true },
      });
      return user?.isOnline;
    } catch (error) {
      console.error('Error in getUserStatus:', error);
      throw error;
    }
  }
}