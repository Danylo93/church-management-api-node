import { Request, Response } from 'express';
import * as networkService from '../services/networkService';

// Rota para listar todos que são Obreiros
export const listObreiros = async (req: Request, res: Response) => {
  try {
    const obreiros = await networkService.listObreiros();
    res.status(200).json(obreiros);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve obreiros' });
  }
};

// Rota para listar todos que são Discipuladores
export const listDiscipuladores = async (req: Request, res: Response) => {
  try {
    const discipuladores = await networkService.listDiscipuladores();
    res.status(200).json(discipuladores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve discipuladores' });
  }
};

// Rota para listar todos que são Líderes
export const listLideres = async (req: Request, res: Response) => {
  try {
    const lideres = await networkService.listLideres();
    res.status(200).json(lideres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve líderes' });
  }
};

// Rota para listar todos que são Pastores
export const listPastores = async (req: Request, res: Response) => {
  try {
    const pastores = await networkService.listPastores();
    res.status(200).json(pastores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve líderes' });
  }
};


// Outras rotas existentes
export const createNetworkObreiro = async (req: Request, res: Response) => {
  const { pastorId, obreiroId, name, quantityCells, quantityMembers, quantityAttendees } = req.body;
  try {
    const network = await networkService.createNetworkObreiro(pastorId, obreiroId, name, quantityCells, quantityMembers, quantityAttendees);
    res.status(201).json(network);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create network of obreiro' });
  }
};

export const createNetworkDiscipulador = async (req: Request, res: Response) => {
  const { obreiroId, discipuladorId, name, quantityMembers, quantityAttendees } = req.body;
  try {
    const network = await networkService.createNetworkDiscipulador(obreiroId, discipuladorId, name, quantityMembers, quantityAttendees);
    res.status(201).json(network);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create network of discipulador' });
  }
};

export const createCell = async (req: Request, res: Response) => {
  const {
    discipuladorId,
    leaderId,
    name,
    quantityMembers,
    quantityAttendees,
    date,
    address,
    obreiroId,
    pastorId,
    quantityGuardAngels,
    quantityNotConsolidated,
    quantityMaturityCourse,
    quantityCLTCourse,
    quantityNotConsolidatedMeeting,
    cellPhase,
    multiplicationDate,
  } = req.body;

  try {
    const cell = await networkService.createCell(
      discipuladorId,
      leaderId,
      name,
      quantityMembers,
      quantityAttendees,
      date,
      address,
      obreiroId,
      pastorId,
      quantityGuardAngels,
      quantityNotConsolidated,
      quantityMaturityCourse,
      quantityCLTCourse,
      quantityNotConsolidatedMeeting,
      cellPhase,
      multiplicationDate
    );
    res.status(201).json(cell);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create cell' });
  }
};

export const updateCell = async (req: Request, res: Response) => {
  const cellId = parseInt(req.params.cellId);
  const {
    discipuladorId,
    leaderId,
    name,
    quantityMembers,
    quantityAttendees,
    date,
    address,
    obreiroId,
    pastorId,
    quantityGuardAngels,
    quantityNotConsolidated,
    quantityMaturityCourse,
    quantityCLTCourse,
    quantityNotConsolidatedMeeting,
    cellPhase,
    multiplicationDate,
  } = req.body;

  if (isNaN(cellId)) {
    return res.status(400).json({ error: 'Invalid cellId' });
  }

  try {
    const updatedCell = await networkService.updateCell(
      cellId,
      discipuladorId,
      leaderId,
      name,
      quantityMembers,
      quantityAttendees,
      date,
      address,
      obreiroId,
      pastorId,
      quantityGuardAngels,
      quantityNotConsolidated,
      quantityMaturityCourse,
      quantityCLTCourse,
      quantityNotConsolidatedMeeting,
      cellPhase,
      multiplicationDate
    );
    res.status(200).json(updatedCell);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update cell' });
  }
};

// Método para listar células por discipulador
export const listCellsByDiscipulador = async (req: Request, res: Response) => {
  const discipuladorId = parseInt(req.params.discipuladorId); // Converte para number
  if (isNaN(discipuladorId)) {
    return res.status(400).json({ error: 'Invalid discipuladorId' });
  }

  try {
    const cells = await networkService.getCellsByDiscipulador(discipuladorId);
    res.status(200).json(cells);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cells' });
  }
};

// Listar células por Rede de Obreiros
export const listCellsByNetworkObreiro = async (req: Request, res: Response) => {
  const networkObreiroId = parseInt(req.params.networkObreiroId);
  if (isNaN(networkObreiroId)) {
    return res.status(400).json({ error: 'Invalid networkObreiroId' });
  }

  try {
    const cells = await networkService.getCellsByNetworkObreiro(networkObreiroId);
    res.status(200).json(cells);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cells' });
  }
};

// Listar células por Pastor
export const listCellsByPastor = async (req: Request, res: Response) => {
  const pastorId = parseInt(req.params.pastorId);
  if (isNaN(pastorId)) {
    return res.status(400).json({ error: 'Invalid pastorId' });
  }

  try {
    const cells = await networkService.getCellsByPastor(pastorId);
    res.status(200).json(cells);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cells' });
  }
};

// Soma de membros e frequentadores por Líder de Célula
export const sumByLeader = async (req: Request, res: Response) => {
  const leaderId = parseInt(req.params.leaderId);
  if (isNaN(leaderId)) {
    return res.status(400).json({ error: 'Invalid leaderId' });
  }

  try {
    const result = await networkService.sumMembersAndAttendeesByLeader(leaderId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sums' });
  }
};

// Soma de membros e frequentadores por Discipulador
export const sumByDiscipulador = async (req: Request, res: Response) => {
  const discipuladorId = parseInt(req.params.discipuladorId);
  if (isNaN(discipuladorId)) {
    return res.status(400).json({ error: 'Invalid discipuladorId' });
  }

  try {
    const result = await networkService.sumMembersAndAttendeesByDiscipulador(discipuladorId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sums' });
  }
};

// Soma de membros e frequentadores por Obreiro
export const sumByObreiro = async (req: Request, res: Response) => {
  const obreiroId = parseInt(req.params.obreiroId);
  if (isNaN(obreiroId)) {
    return res.status(400).json({ error: 'Invalid obreiroId' });
  }

  try {
    const result = await networkService.sumMembersAndAttendeesByObreiro(obreiroId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sums' });
  }
};

// Soma de membros e frequentadores por Pastor
export const sumByPastor = async (req: Request, res: Response) => {
  const pastorId = parseInt(req.params.pastorId);
  if (isNaN(pastorId)) {
    return res.status(400).json({ error: 'Invalid pastorId' });
  }

  try {
    const result = await networkService.sumMembersAndAttendeesByPastor(pastorId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sums' });
  }
};
