import { Router } from "express";
import {
  createReport,
  editReport,
  deleteReport,
  listReportsByLeader,
  listReportsByDiscipler,
  listReportsByWorker,
  listReportsByPastor,
} from "../controllers/cellReportController";
import { getMonthlyReportHandler } from "../controllers/reportGraphicsController";

const router = Router();

router.post("/reports/create", createReport); // Criar Relatorio
router.put("/reports/edit/:id", editReport); // Editar Relatório
router.delete("/reports/delete/:id", deleteReport); // Deletar Relatorio
router.get("/reports/leader/:leaderId", listReportsByLeader); // Listar Relatorio por Lider
router.get("/reports/discipler/:disciplerId", listReportsByDiscipler); // Listar Relatorio por Discipulador
router.get("/reports/worker/:workerId", listReportsByWorker);
router.get("/reports/pastor/:pastorId", listReportsByPastor);


router.get("/reports/monthly", getMonthlyReportHandler);

export default router;
