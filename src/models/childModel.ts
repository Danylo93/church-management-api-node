import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getChildrenByParentId = async (parentId: number) => {
  return await prisma.child.findMany({
    where: {
      parentId,
    },
  });
};
