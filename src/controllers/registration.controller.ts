import { Request, Response } from "express";
import { RegistrationService } from "../services/registration.service";

export class RegistrationController {
  private registrationService: RegistrationService;

  constructor() {
    this.registrationService = new RegistrationService();
  }

  async registerUser(req: Request, res: Response) {
    const { id: eventId } = req.params;
    const { userId, answers } = req.body;

    try {
      const registration = await this.registrationService.registerUser({
        eventId,
        userId,
        answers,
      });
      res.status(201).json(registration);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
