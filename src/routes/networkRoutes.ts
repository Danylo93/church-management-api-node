// src/routes/networkRoutes.ts

import { Router } from 'express';
import * as networkController from '../controllers/networkController';
import { createNetworkObreiro, createNetworkDiscipulador, createCell } from '../controllers/networkController';

const router = Router();

router.post('/networks/obreiro', createNetworkObreiro);
router.post('/networks/discipulador', createNetworkDiscipulador);
router.post('/cells', createCell);
router.put('/cells/:cellId', networkController.updateCell);


router.get('/cells/discipulador/:discipuladorId', networkController.listCellsByDiscipulador);
router.get('/cells/obreiro/:networkObreiroId', networkController.listCellsByNetworkObreiro);
router.get('/cells/pastor/:pastorId', networkController.listCellsByPastor);

router.get('/qtd/members/leader/:leaderId', networkController.sumByLeader);
router.get('/qtd/members/discipulador/:discipuladorId', networkController.sumByDiscipulador);
router.get('/qtd/members/obreiro/:obreiroId', networkController.sumByObreiro);
router.get('/qtd/members/pastor/:pastorId', networkController.sumByPastor);



export default router;
