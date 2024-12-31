import { Router } from "express";
import { createMemberController, listCellMembers } from "../controllers/memberController";

const router = Router();

// Rota para criar um novo membro
router.post("/members", createMemberController);
router.get('/members/:leaderId', listCellMembers);


export default router;
