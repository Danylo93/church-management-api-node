// src/services/eventService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvent = async (eventData: { title: string, description: string, date: string, time: string, location: string }) => {
  try {
    const { title, description, date, time, location } = eventData;

    // Criando o evento no banco de dados
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time: new Date(`${date}T${time}`),
        location,
      },
    });

    return newEvent;
  } catch (error) {
    throw new Error(`Erro ao criar evento: ${error}`);
  }
};

// Função para listar todos os eventos
export const getEvents = async () => {
    try {
      const events = await prisma.event.findMany();  // Busca todos os eventos
      return events;
    } catch (error) {
      throw new Error(`Erro ao listar eventos: ${error}`);
    }
  };
