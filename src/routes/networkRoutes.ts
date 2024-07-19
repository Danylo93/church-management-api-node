// src/routes/networkRoutes.ts

import { Router } from 'express';
import * as networkController from '../controllers/networkController';
import { createNetworkObreiro, createNetworkDiscipulador, createCell, deleteCell } from '../controllers/networkController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/networks/obreiro', createNetworkObreiro);
router.post('/networks/discipulador', createNetworkDiscipulador);
router.post('/cells', createCell);
router.put('/cells/:cellId', networkController.updateCell);


router.get('/cells/discipulador/:discipuladorId', networkController.listCellsByDiscipulador);
router.get('/cells/obreiro/:networkObreiroId', networkController.listCellsByNetworkObreiro);
router.get('/cells/pastor/:pastorId', networkController.listCellsByPastor);
router.get('/cells/leader/:leaderId', networkController.listCellsByLeader);

router.delete('/cells/:cellId', deleteCell);



router.get('/qtd/members/leader/:leaderId', networkController.sumByLeader);
router.get('/qtd/members/discipulador/:discipuladorId', networkController.sumByDiscipulador);
router.get('/qtd/members/obreiro/:obreiroId', networkController.sumByObreiro);
router.get('/qtd/members/pastor/:pastorId', networkController.sumByPastor);

// Rota para listar todos que são Obreiros
router.get('/obreiros', networkController.listObreiros);

// Rota para listar todos que são Discipuladores
router.get('/discipuladores', networkController.listDiscipuladores);

// Rota para listar todos que são Líderes
router.get('/lideres', networkController.listLideres);

router.get('/pastores', networkController.listPastores);




export default router;
