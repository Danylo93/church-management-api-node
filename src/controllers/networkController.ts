import { Request, Response } from 'express';
import * as networkService from '../services/networkService';
import { getAverageMembersAndAttendeesByDiscipulador, getReportsByDiscipulador, sendReportToObreiro as sendReportToObreiroService } from '../services/networkService';


export const listLeadersByDiscipulador = async (req: Request, res: Response) => {
  const discipuladorId = parseInt(req.params.discipuladorId);
  
  if (isNaN(discipuladorId)) {
    return res.status(400).json({ error: 'Invalid discipuladorId' });
  }

  try {
    const leaderNames = await networkService.getLeadersByDiscipulador(discipuladorId);
    res.status(200).json(leaderNames); // Retorna apenas os nomes dos líderes
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve leaders' });
  }
};

export const listDiscipuladorByObreiro = async (req: Request, res: Response) => {
  const obreiroId = parseInt(req.params.obreiroId, 10);
  
  if (isNaN(obreiroId)) {
    return res.status(400).json({ error: 'Invalid obreiroId' });
  }

  try {
    const discipuladorNames = await networkService.getDiscipuladorByObreiro(obreiroId);
    res.status(200).json(discipuladorNames); // Retorna apenas os nomes dos discipuladores
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve discipuladores' });
  }
};

export const getAverageMembersAndAttendees = async (req: Request, res: Response) => {
  const discipuladorId = parseInt(req.params.discipuladorId, 10);

  if (isNaN(discipuladorId)) {
    return res.status(400).json({ error: 'Invalid discipuladorId' });
  }

  try {
    const averages = await getAverageMembersAndAttendeesByDiscipulador(discipuladorId);
    res.status(200).json(averages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate averages' });
  }
};





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

export const createReportLeader = async (req: Request, res: Response) => {
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
    // Chame o serviço passando os parâmetros. Campos opcionais podem ser passados como undefined se não estiverem presentes
    const cell = await networkService.createReportLeader(
      discipuladorId,
      leaderId,  // Use null se não houver valor
      name || '',  // Use uma string vazia se não houver valor
      quantityMembers,
      quantityAttendees,
      date,
      address || '',  // Use uma string vazia se não houver valor
      obreiroId,
      pastorId,
      quantityGuardAngels || null,  // Use null se não houver valor
      quantityNotConsolidated || null,  // Use null se não houver valor
      quantityMaturityCourse || null,  // Use null se não houver valor
      quantityCLTCourse || null,  // Use null se não houver valor
      quantityNotConsolidatedMeeting || null,  // Use null se não houver valor
      cellPhase,
      multiplicationDate
    );
    res.status(201).json(cell);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create cell' });
  }
};

export const sendReportToObreiro = async (req: Request, res: Response): Promise<void> => {
  const { discipuladorId, obreiroId, pastorId } = req.body;

  try {
    const { success, message } = await sendReportToObreiroService(
      discipuladorId,
      obreiroId,
      pastorId
    );

    if (!success) {
      res.status(400).json({ message }); // Retorna uma mensagem se o relatório não puder ser enviado
      return;
    }

    res.status(201).json({ message: 'Relatório enviado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send reports to Obreiro' });
  }
};


export const updateReportCellOfLeader = async (req: Request, res: Response) => {
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

export const fetchReportsByDiscipulador = async (req: Request, res: Response): Promise<void> => {
  const { discipuladorId } = req.params;

  try {
    const reports = await getReportsByDiscipulador(Number(discipuladorId));
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reports by discipulador' });
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


export const listCellsByLeader = async (req: Request, res: Response) => {
  const leaderId = parseInt(req.params.leaderId);
  if (isNaN(leaderId)) {
    return res.status(400).json({ error: 'Invalid leaderId' });
  }

  try {
    const cells = await networkService.getCellsByLeader(leaderId);
    res.status(200).json(cells);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cells' });
  }
};

export const deleteCell = async (req: Request, res: Response) => {
  const cellId = parseInt(req.params.cellId);

  // Verificar se req.user está definido e possui um id
 
  if (isNaN(cellId)) {
    return res.status(400).json({ error: 'Invalid cellId' });
  }

  try {
    await networkService.deleteCell(cellId);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};


export const listRecentCellsByLeader = async (req: Request, res: Response) => {
  const leaderId = parseInt(req.params.leaderId);

  if (isNaN(leaderId)) {
    return res.status(400).json({ error: 'Invalid leaderId' });
  }

  try {
    const result = await networkService.listRecentCellsByLeader(leaderId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recent cells data' });
  }
};