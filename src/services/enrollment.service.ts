import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Interface para os dados de inscrição
interface EnrollmentData {
  courseId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  leaderId?: number;
  discipuladorId?: number;
  obreiroId?: number;
  pastorId?: number;
}

// Função para inscrever um usuário no curso
export const enrollInCourseService = async (data: EnrollmentData) => {
  // Verifica se o curso existe
  const course = await prisma.course.findUnique({
    where: { id: data.courseId },
  });

  if (!course) {
    throw new Error("Curso não encontrado.");
  }

  // Cria a inscrição no curso
  const enrollment = await prisma.enrollment.create({
    data,
  });

  return enrollment;
};

export const  getEnrollmentsByCourse = async () => {
    const alunos = await prisma.course.findMany({
        select: {
          name: true,
          enrollments: {
            select: {
              name: true,
              leader: {
                select: {
                  name: true,
                },
              },
              discipulador: {
                select: {
                  name: true,
                },
              },
              pastor: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

    return alunos;
  }