import { Router } from "express";
import PhotosController from "../controllers/PhotosController";

const router = Router();

router.get("/", PhotosController.list);
router.get("/count", PhotosController.count);

export default router;