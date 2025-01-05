import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RegisterUserData {
  eventId: string;
  userId: string;
  answers: any; // Respostas ao formulário
}

export class RegistrationService {
  async registerUser(data: RegisterUserData) {
    return await prisma.registration.create({
      data: {
        eventId: data.eventId,
        userId: data.userId,
        answers: data.answers,
      },
    });
  }
}
