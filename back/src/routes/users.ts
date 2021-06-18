import { Router } from "express";
import UsersController from "../controllers/UsersController";

const router = Router();

router.post("/register", UsersController.create);
router.post("/login", UsersController.login);
router.get("/me", UsersController.details);

export default router;
