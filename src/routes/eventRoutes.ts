// src/routes/eventRoutes.ts
import { Router } from 'express';
import * as eventController from '../controllers/eventsController';

const router = Router();

// Rota para criar evento
router.post('/events', eventController.createEvent);

// Rota para listar todos os eventos
router.get('/events', eventController.getEvents);

export default router;
