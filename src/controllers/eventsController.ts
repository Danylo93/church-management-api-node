// src/controllers/eventController.ts
import { Request, Response } from 'express';
import * as eventService from '../services/eventService';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const eventData = req.body;
    const newEvent = await eventService.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar evento', error: error });
  }
};


// Função para listar eventos
export const getEvents = async (req: Request, res: Response) => {
    try {
      const events = await eventService.getEvents();
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar eventos', error: error });
    }
  };