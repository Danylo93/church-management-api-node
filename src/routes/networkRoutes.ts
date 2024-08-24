// src/routes/networkRoutes.ts

import { Router } from 'express';
import * as networkController from '../controllers/networkController';
import { createNetworkObreiro,sendReportToObreiro, createNetworkDiscipulador,listLeadersByDiscipulador, createReportLeader, deleteCell, listRecentCellsByLeader, listReportsByDiscipulador } from '../controllers/networkController';

const router = Router();

router.post('/networks/obreiro', createNetworkObreiro);
router.post('/networks/discipulador', createNetworkDiscipulador);
router.post('/cells', createReportLeader);
router.put('/cells/:cellId', networkController.updateCell);


router.get('/cells/discipulador/:discipuladorId', networkController.listCellsByDiscipulador);
router.get('/cells/obreiro/:networkObreiroId', networkController.listCellsByNetworkObreiro);
router.get('/cells/pastor/:pastorId', networkController.listCellsByPastor);
router.get('/cells/leader/:leaderId', networkController.listCellsByLeader);

router.delete('/cells/:cellId', deleteCell);

router.get('/recent-cells-by-leader/:leaderId', networkController.listRecentCellsByLeader);


router.get('/discipuladores/:discipuladorId/leaders', listLeadersByDiscipulador)
router.get('/obreiros/:obreiroId/discipuladores', networkController.listDiscipuladorByObreiro)

// Chart Discipulador
router.get('/average-members-attendees/:discipuladorId', networkController.getAverageMembersAndAttendees);


// Rota para listar todos que são Obreiros
router.get('/obreiros', networkController.listObreiros);

// Rota para listar todos que são Discipuladores
router.get('/discipuladores', networkController.listDiscipuladores);

// Rota para listar todos que são Líderes
router.get('/lideres', networkController.listLideres);

router.get('/pastores', networkController.listPastores);

// envia relatório para Obreiro
router.post('/send-report', sendReportToObreiro);
router.get('/reports/discipulador/:discipuladorId', listReportsByDiscipulador);


export default router;
