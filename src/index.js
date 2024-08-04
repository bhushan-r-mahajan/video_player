import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT | 8080;

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started successfully at ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
