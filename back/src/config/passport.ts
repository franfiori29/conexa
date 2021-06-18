import passport from "passport";
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { getRepository } from "typeorm";

import User from "../entities/User";
const { SECRET_KEY } = process.env;

passport.use(
  new LocalStrategy(async (email, password, cb) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      select: ["id", "username"],
      where: { email },
    });
    if (!user) { return cb(null, false); }
    if (!user.isValidPassword(password)) { return cb(null, false); }
    return cb(null, user);
  }),
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const user = jwt.verify(token, SECRET_KEY!) as User;
      const userRepository = getRepository(User);
      const response = await userRepository.findOne(user.id)
      return done(null, response ? user : false);
    } catch (error) {
      done(error, null);
    }
  }
  )
);

passport.serializeUser((user: User, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id });
  return cb(null, user);
});

export default passport;
