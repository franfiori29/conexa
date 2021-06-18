import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import passport from "./config/passport";
import routes from "./routes";
import cors from "cors";

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(morgan("dev"));
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.all("*", function (req, res, next) {
  passport.authenticate("bearer", function (err, user) {
    if (err) return res.status(400).json({ message: 'malformed JSON' });
    if (user) req.user = user;
    return next();
  })(req, res, next);
});

app.use("/", routes);

export default app;
