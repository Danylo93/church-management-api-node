import { PrismaClient } from '@prisma/client';
import { getDatabaseUrlForTenant } from './getDatabaseUrlForTenant';

const clients: Record<string, PrismaClient> = {};

export const getPrismaForTenant = async (subdomain: string): Promise<PrismaClient> => {
  if (!clients[subdomain]) {
    const url = await getDatabaseUrlForTenant(subdomain);
    clients[subdomain] = new PrismaClient({ datasources: { db: { url } } });
  }
  return clients[subdomain];
};
