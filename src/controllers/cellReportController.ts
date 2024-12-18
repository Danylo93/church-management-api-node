import { Request, Response } from "express";
import {
  createCellReport,
  updateCellReport,
  deleteCellReport,
  getCellReportsByLeader,
  getCellReportsByDiscipler,
  getCellReportsByWorker,
  getCellReportsByPastor,
} from "../services/cellReportService";

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

export const createReport = async (req: Request, res: Response) => {
  try {
    const report = await createCellReport(req.body);
    res.status(201).json(report);
  } catch (error) {
    handleError(res, error, "Erro ao criar o relatório da célula.");
  }
};

export const editReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const report = await updateCellReport(Number(id), req.body);
    if (!report) {
      return res.status(404).json({ error: "Relatório não encontrado para edição." });
    }
    res.json(report);
  } catch (error) {
    handleError(res, error, "Erro ao editar o relatório da célula.");
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteCellReport(Number(id));
    if (result === null) {
      return res.status(404).json({ error: "Relatório não encontrado para exclusão." });
    }
    res.status(204).send();
  } catch (error) {
    handleError(res, error, "Erro ao excluir o relatório da célula.");
  }
};

export const listReportsByLeader = async (req: Request, res: Response) => {
  try {
    const { leaderId } = req.params;
    const reports = await getCellReportsByLeader(Number(leaderId));
    if (reports.length === 0) {
      return res.status(404).json({ error: "Nenhum relatório encontrado para esse líder." });
    }
    res.json(reports);
  } catch (error) {
    handleError(res, error, "Erro ao listar os relatórios do líder.");
  }
};

export const listReportsByDiscipler = async (req: Request, res: Response) => {
  try {
    const { disciplerId } = req.params;
    const reports = await getCellReportsByDiscipler(Number(disciplerId));
    if (reports.length === 0) {
      return res.status(404).json({ error: "Nenhum relatório encontrado para esse discipulador." });
    }
    res.json(reports);
  } catch (error) {
    handleError(res, error, "Erro ao listar os relatórios do discipulador.");
  }
};

export const listReportsByWorker = async (req: Request, res: Response) => {
  try {
    const { workerId } = req.params;
    const reports = await getCellReportsByWorker(Number(workerId));
    if (reports.length === 0) {
      return res.status(404).json({ error: "Nenhum relatório encontrado para esse obreiro." });
    }
    res.json(reports);
  } catch (error) {
    handleError(res, error, "Erro ao listar os relatórios do obreiro.");
  }
};

export const listReportsByPastor = async (req: Request, res: Response) => {
  try {
    const { pastorId } = req.params;
    const reports = await getCellReportsByPastor(Number(pastorId));
    if (reports.length === 0) {
      return res.status(404).json({ error: "Nenhum relatório encontrado para esse pastor." });
    }
    res.json(reports);
  } catch (error) {
    handleError(res, error, "Erro ao listar os relatórios do pastor.");
  }
};
