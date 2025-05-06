import { Request, Response } from "express";
import { simulatePayment } from "../services/payment.service";

export const makePayment = (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  const payment = simulatePayment(amount);
  res.status(200).json(payment);
};
