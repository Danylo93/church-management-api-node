// src/routes/eventRoutes.ts
import { Router } from 'express';
import { EventController } from '../controllers/eventsController';

const router = Router();
const eventController = new EventController();


router.post("/events", eventController.createEvent.bind(eventController));
router.get("/events", eventController.getEventById.bind(eventController));

export default router;
