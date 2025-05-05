import { Request, Response } from 'express';
import { createCell, getAllCells } from '../services/cellService';

export const addCell = async (req: Request, res: Response) => {
  try {
    const { leaderId, disciplerId, obreiroId, pastorId, whatsapp, address, schedule } = req.body;

    // Validate input
    if (!leaderId || !disciplerId || !obreiroId || !pastorId || !whatsapp || !address || !schedule) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Create the cell
    const cell = await createCell({ leaderId, disciplerId, obreiroId, pastorId, whatsapp, address, schedule });

    res.status(201).json(cell);
  } catch (error) {
    console.error('Erro ao adicionar célula:', error);
    res.status(500).json({ message: error });
  }
};

export const listCells = async (req: Request, res: Response) => {
    try {
      const cells = await getAllCells();
      res.status(200).json(cells);
    } catch (error) {
      console.error('Erro ao listar células:', error);
      res.status(500).json({ message: 'Erro ao listar células' });
    }
  };