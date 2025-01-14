import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateEventData {
  name: string;
  description: string;
  image: string;
  startDate: Date;
  endDate: Date;
  formUrl: string;
}

export class EventService {
  async createEvent(data: CreateEventData) {
    return await prisma.event.create({
      data: {
        name: data.name,
        image: data.image,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        formUrl: data.formUrl, // Armazenando o link do formulário
      },
    });
  }
  

  async getEventById() {
    const event = await prisma.event.findMany();

    if (!event) {
      throw new Error("Evento não encontrado.");
    }

    return event;
  }
}
