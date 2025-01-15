// src/routes/notificationRoutes.ts
import express from 'express';
import { createNotification, getNotifications, markNotificationAsRead, sendNotificationToAll } from '../controllers/notificationController';

const router = express.Router();

// Rota para criar uma notificação
router.post('/notifications', createNotification);

// Rota para obter as notificações de um usuário
router.get('/notifications/:userId', getNotifications);

router.post('/notifications/send-to-all', sendNotificationToAll);
router.patch('/notifications/:userId/:notificationId', markNotificationAsRead);



export default router;
