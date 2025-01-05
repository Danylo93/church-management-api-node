import { Request, Response } from "express";
import { EventService } from "../services/eventService";

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  async createEvent(req: Request, res: Response) {
    const { name, description, startDate,image, endDate, formFields } = req.body;

    try {
      const event = await this.eventService.createEvent({
        name,
        image,
        description,
        startDate,
        endDate,
        formFields,
      });
      res.status(201).json(event);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEventById(req: Request, res: Response) {
   
    try {
      const event = await this.eventService.getEventById();
      res.status(200).json(event);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}
