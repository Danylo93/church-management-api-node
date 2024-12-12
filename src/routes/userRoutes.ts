import { Router } from "express";
import {
  registerUser,
  editUser,
  listUsers,
  listLeadersByDiscipler,
  listLeadersByWorker,
  listDisciplersByWorker,
  getUserDetailsController,
  fetchUsersByRole,
} from "../controllers/userController";

const router = Router();

router.post("/register", registerUser); // Cadastrar Usuário
router.put("/edit/:id", editUser); // Editar Usuario
//router.delete("/delete/:id", deleteUser);
router.get("/users", listUsers); // Listar todos os Usuarios
router.get("/leaders-by-discipler/:disciplerId", listLeadersByDiscipler); // Listar Líderes por Discipulador
router.get("/leaders-by-worker/:workerId", listLeadersByWorker); // Listar Líderes por Obreiro com os Discipuladores
router.get("/disciplers-by-worker/:workerId", listDisciplersByWorker); // Listar Discipuladores por Obreiro
router.get("/users/:userId/details", getUserDetailsController);

router.get("/find/users-role", fetchUsersByRole)



export default router;
