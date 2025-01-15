import { Router } from "express";
import { createMemberController, listCellFrequentador, listCellMembers } from "../controllers/memberController";

const router = Router();

// Rota para criar um novo membro
router.post("/members", createMemberController);
router.get('/members/:leaderId', listCellMembers);
router.get('/attendees/:leaderId', listCellFrequentador);



export default router;
