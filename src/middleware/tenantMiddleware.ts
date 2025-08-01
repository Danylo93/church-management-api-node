import { Request, Response, NextFunction } from 'express';
import { getPrismaForTenant } from '../utils/prismaForTenant';

export const tenantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subdomainHeader = req.headers['x-tenant-subdomain'];
  if (!subdomainHeader || typeof subdomainHeader !== 'string') {
    return res.status(400).json({ error: 'Cabeçalho x-tenant-subdomain obrigatório' });
  }
  try {
    req.prisma = await getPrismaForTenant(subdomainHeader);
    req.tenantSubdomain = subdomainHeader;
    next();
  } catch (err) {
    console.error('Erro ao resolver tenant', err);
    return res.status(400).json({ error: 'Tenant inválido' });
  }
};
