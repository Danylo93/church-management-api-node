import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { enrollInCourseService, getEnrollmentsByCourse } from "../services/enrollment.service";

const prisma = new PrismaClient();




export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const {
      courseId,
      name,
      email,
      phone,
      address,
      leaderId,
      discipuladorId,
      obreiroId,
      pastorId,
    } = req.body;

    // Validações no controller
    if (!courseId) {
      return res.status(400).json({ error: "O ID do curso é obrigatório." });
    }
    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "O nome e o email do usuário são obrigatórios." });
    }

    // Chama o service para criar a inscrição
    const enrollment = await enrollInCourseService({
      courseId,
      name,
      email,
      phone,
      address,
      leaderId,
      discipuladorId,
      obreiroId,
      pastorId,
    });

    return res.status(201).json({
      message: "Inscrição realizada com sucesso!",
      enrollment,
    });
  } catch (error) {
    console.error("Erro ao inscrever no curso:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};




export const  getAlunosByCourse = async (eq: Request, res: Response) => {
    try {
        const coursesWithEnrollments = await getEnrollmentsByCourse();
        res.json(coursesWithEnrollments);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}