// src/controllers/notificationController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const prisma = new PrismaClient();


// Defina um tipo para os dados da notificação
interface NotificationData {
    userId: number;
    title: string;
    message: string;
  }

// Criar uma nova notificação
// notificationController.ts
export const createNotification = async (notificationData: { userId: number; title: string; message: string }) => {
    const { userId, title, message } = notificationData;
  
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          title,
          message,
        },
      });
      return notification;
    } catch (error) {
      throw new Error('Erro ao criar notificação');
    }
  };
  

// Obter as notificações de um usuário
export const getNotifications = async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    // Converter userId para inteiro (Int)
    const parsedUserId = parseInt(userId, 10);
  
    // Verificar se a conversão foi bem-sucedida
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: 'ID do usuário inválido. Deve ser um número.' });
    }
  
    try {
      // Consultar as notificações para o usuário
      const notifications = await prisma.notification.findMany({
        where: { userId: parsedUserId },
      });
  
      res.status(200).json({ notifications });
    } catch (error) {
      console.error('Erro ao obter notificações:', error);
      res.status(500).json({ error: 'Erro ao obter notificações' });
    }
  };
  
  


// Função para enviar notificação para todos os usuários
export const sendNotificationToAll = async (req: Request, res: Response) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: 'Título e mensagem são obrigatórios.' });
  }

  try {
    // Enviar notificação para todos os usuários
    const users = await prisma.user.findMany(); // Obtém todos os usuários

    // Criar notificações para todos os usuários
    const notifications = await prisma.notification.createMany({
      data: users.map(user => ({
        userId: user.id,
        title,
        message,
        read: false,
      })),
    });

    return res.status(201).json({ message: 'Notificação enviada a todos os usuários.', notifications });
  } catch (error) {
    console.error('Erro ao enviar notificações:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

// Marcar a notificação como lida
export const markNotificationAsRead = async (req: Request, res: Response) => {
    const { userId, notificationId } = req.params;
  
    // Converter o userId para número
    const parsedUserId = parseInt(userId, 10); // Conversão para número
    const parsedNotificationId = notificationId; // O notificationId continua sendo string
  
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ error: 'userId deve ser um número válido' });
    }
  
    try {
      // Atualizar a notificação no banco de dados, marcando como lida
      const notification = await prisma.notification.updateMany({
        where: {
          id: parsedNotificationId,  // notificationId continua sendo string
          userId: parsedUserId, // userId agora é um número
        },
        data: {
          read: true,
        },
      });
  
      // Verificar se a notificação foi atualizada
      if (notification.count === 0) {
        return res.status(404).json({ error: 'Notificação não encontrada ou não pertence ao usuário.' });
      }
  
      res.status(200).json({ message: 'Notificação marcada como lida.' });
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      res.status(500).json({ error: 'Erro ao marcar notificação como lida.' });
    }
  };
  