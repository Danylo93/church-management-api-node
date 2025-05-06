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
  updatePhoto,
} from "../controllers/userController";
import { handleChildStatusUpdate, registerChildController } from "../controllers/generateQRCodeForChildController";
import { getChildrenByParent } from "../controllers/childController";
import { listFiles, uploadFile } from "../controllers/fileController";
import { listCourses } from "../controllers/course.controller";
import { enrollInCourse, getAlunosByCourse } from "../controllers/enrollment.controller";
import { makePayment } from "../controllers/payment.controller";
import { setUserStatus, getUserStatus } from '../controllers/userStatus.controller';
import { addCell, listCells } from "../controllers/cellController";

const router = Router();

router.put('/users/:userId/photo', updatePhoto);


router.post("/register", registerUser); // Cadastrar Usuário
router.put("/edit/:id", editUser); // Editar Usuario
//router.delete("/delete/:id", deleteUser);
router.get("/users", listUsers); // Listar todos os Usuarios
router.get("/leaders-by-discipler/:disciplerId", listLeadersByDiscipler); // Listar Líderes por Discipulador
router.get("/leaders-by-worker/:workerId", listLeadersByWorker); // Listar Líderes por Obreiro com os Discipuladores
router.get("/disciplers-by-worker/:workerId", listDisciplersByWorker); // Listar Discipuladores por Obreiro
router.get("/users/:userId/details", getUserDetailsController);

router.get("/find/users-role", fetchUsersByRole)

router.post('/children', registerChildController);
router.post("/children/update-status", handleChildStatusUpdate);
router.get('/children/parent/:parentId', getChildrenByParent);

router.post('/files/upload', uploadFile);
router.get('/files/list', listFiles);

router.get("/courses", listCourses);
router.post("/enroll", enrollInCourse);
router.post("/payment", makePayment);
router.get('/enrollments-by-course', getAlunosByCourse);

router.post('/user/status', setUserStatus);
router.get('/user/status/:userId', getUserStatus);

router.post('/add/cells', addCell);
router.get('/all/cells', listCells);


export default router;
