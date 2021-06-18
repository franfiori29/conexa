import { Router } from "express";
import PostsController from "../controllers/PostsController";

const router = Router();

router.get("/", PostsController.list);
router.get("/count", PostsController.count);
router.get("/comments", PostsController.comments);

export default router;