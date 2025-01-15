import { Router } from "express";
import { RegistrationController } from "../controllers/registration.controller";

const router = Router();
const registrationController = new RegistrationController();

router.post("/:id/register", registrationController.registerUser.bind(registrationController));

export default router;
