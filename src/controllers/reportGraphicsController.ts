import { Request, Response } from "express";
import { getMonthlyReport, getMonthlyReportByDiscipulador, getMonthlyWorkerReport } from "../services/reportGraphics";

// Função auxiliar para formatar erros
const handleError = (res: Response, error: any, customMessage: string) => {
  // Log do erro no servidor para debugging
  console.error(error);

  // Retornar um erro mais informativo
  if (error instanceof Error) {
    return res.status(400).json({ error: customMessage, details: error.message });
  } else {
    return res.status(500).json({ error: "Erro interno do servidor", details: error });
  }
};

// Endpoint para retornar os relatórios mensais
export const getMonthlyReportHandler = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query; // Recebe mês e ano como parâmetros
    
    // Verifica se o mês e o ano foram fornecidos
    if (!month || !year) {
      return res.status(400).json({ message: "Mês e ano são obrigatórios" });
    }

    // Converte mês e ano para números
    const monthNumber = parseInt(month as string, 10);
    const yearNumber = parseInt(year as string, 10);

    // Valida se os valores de mês e ano são válidos
    if (isNaN(monthNumber) || isNaN(yearNumber)) {
      return res.status(400).json({ message: "Mês e ano devem ser números válidos." });
    }

    // Chama a função para obter os relatórios mensais
    const report = await getMonthlyReport(monthNumber, yearNumber);

    if (!report) {
      return res.status(404).json({ message: "Relatório não encontrado para o mês e ano informados." });
    }

    // Retorna os relatórios mensais calculados
    res.json(report);

  } catch (error) {
    handleError(res, error, "Erro ao obter o relatório mensal.");
  }
};

export const getMonthlyReportByDiscipuladorHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { discipuladorId, month, year } = req.query;

    // Validação dos parâmetros
    if (!discipuladorId || !month || !year) {
      return res
        .status(400)
        .json({ message: "Discipulador ID, mês e ano são obrigatórios." });
    }

    const monthNumber = parseInt(month as string, 10);
    const yearNumber = parseInt(year as string, 10);

    if (isNaN(monthNumber) || isNaN(yearNumber)) {
      return res
        .status(400)
        .json({ message: "Mês e ano devem ser números válidos." });
    }

    // Chama o serviço para obter o relatório
    const report = await getMonthlyReportByDiscipulador(
      discipuladorId as string,
      monthNumber,
      yearNumber
    );

    if (!report) {
      return res
        .status(404)
        .json({ message: "Nenhum relatório encontrado para o discipulador." });
    }

    // Retorna o relatório em formato JSON
    res.status(200).json(report);
  } catch (error) {
    console.error("Erro ao buscar relatório mensal por discipulador:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
};


export const getWorkerReportHandler = async (req: Request, res: Response) => {
  try {
    const { workerId, month, year } = req.body;

    // Verifica se os parâmetros obrigatórios foram fornecidos
    if (!workerId || !month || !year) {
      return res.status(400).json({
        message: "Parâmetros obrigatórios: workerId, month e year.",
      });
    }

    // Chama o serviço para buscar o relatório
    const report = await getMonthlyWorkerReport(workerId, month, year);

    // Retorna o relatório como resposta
    return res.status(200).json(report);
  } catch (error) {
    console.error("Erro ao obter relatório de obreiro:", error);
    return res.status(500).json({
      message: "Erro interno do servidor.",
      error: error,
    });
  }
};


