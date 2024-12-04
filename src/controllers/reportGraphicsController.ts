import { Request, Response } from "express";
import { getMonthlyReport } from "../services/reportGraphics";

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
