import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import User from "../entities/User";
const { SECRET_KEY } = process.env;

class UsersController {
  static create: RequestHandler = async (req, res) => {
    const userRepository = getRepository(User);
    try {
      const user = userRepository.create(req.body as User);
      const newUser = await userRepository.save(user);
      const token = jwt.sign({ id: newUser.id }, SECRET_KEY as string, {
        expiresIn: 24 * 60 * 60,
      });
      return res.json({ token });
    } catch {
      return res.sendStatus(409);
    }
  }

  static details: RequestHandler = async (req, res) => {
    const userRepository = getRepository(User);
    if (!req.user?.id) return res.sendStatus(401);
    const user = await userRepository.findOne(req.user.id);
    return res.json({ user });
  }

  static login: RequestHandler = async (req, res) => {
    const userRepository = getRepository(User);
    try {
      const userPass = await userRepository.findOne(
        { username: req.body.username },
        { select: ["password"] }
      );
      if (!userPass) return res.sendStatus(400);
      if (!userPass.isValidPassword(req.body.password)) res.sendStatus(401);
      const user = await userRepository.findOne(
        { username: req.body.username }
      );
      const token = jwt.sign({ id: user!.id }, SECRET_KEY as string, {
        expiresIn: 24 * 60 * 60,
      });
      return res.json({ token });
    } catch (error) {
      console.log(`error`, error)
      return res.sendStatus(500);
    }
  }
}

export default UsersController;
