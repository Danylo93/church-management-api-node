import { Request, Response } from 'express';
import { listChildrenByParent } from '../services/childService';

export const getChildrenByParent = async (req: Request, res: Response) => {
  try {
    const { parentId } = req.params;

    if (!parentId) {
      return res.status(400).json({ error: 'O ID do responsável é obrigatório.' });
    }

    const children = await listChildrenByParent(Number(parentId));
    return res.status(200).json(children);
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erro ao buscar as crianças do responsável.' });
  }
};
