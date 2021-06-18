import { RequestHandler, Router } from "express";
import photos from "./photos";
import posts from "./posts";
import users from "./users";

const router = Router();

const isAuthenticated: RequestHandler = (req, res, next) => {
  if (!req.hasOwnProperty("user")) {
    return res.sendStatus(401);
  };
  return next();
}

router.use("/photos", isAuthenticated, photos);
router.use("/posts", isAuthenticated, posts);
router.use("/users", users);

export default router;
