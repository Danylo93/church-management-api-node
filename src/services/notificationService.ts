// src/services/notificationService.ts

export class NotificationService {
    // Simula a criação de uma notificação
    public async createNotification(userId: string, message: string) {
      // Aqui você pode integrar com seu banco de dados, por exemplo, com Prisma ou Sequelize.
      // Vamos simular a criação de uma notificação com um objeto simples.
  
      const newNotification = {
        userId,
        message,
        date: new Date(),
      };
  
      // Retorna a notificação criada
      return newNotification;
    }
  
    // Simula a listagem de notificações
    public async getNotifications(userId: string) {
      // Simulando a busca no banco de dados.
      const notifications = [
        { userId, message: "Nova mensagem", date: new Date() },
        { userId, message: "Sua conta foi atualizada", date: new Date() },
      ];
  
      return notifications;
    }
  }
  
  export const notificationService = new NotificationService();
  