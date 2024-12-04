import { Router, Request, Response } from "express";
import { loginUser } from "../controllers/authController";
import authenticateToken from "../middleware/authMiddleware";

const router = Router();

// Rota para login
router.post("/login", loginUser);

// Rota para obter perfil do usuário (protegida)
router.get("/profile", authenticateToken, (req: Request, res: Response) => {
  // Agora, req.user tem os dados do usuário do JWT
  // Verifica se req.user existe antes de retornar
  if (!req.user) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }
  
  res.json(req.user); // Retorna os dados do usuário do JWT
});

export default router;
