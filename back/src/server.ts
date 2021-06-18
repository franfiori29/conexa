import "reflect-metadata";
import "./config/dotenv";
import app from "./app";
import { createConnection } from "typeorm";

const port = process.env.PORT || 8000;

(async () => {
  try {
    await createConnection();
    console.log("Database connection created");
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) { console.log(error) };
})();

