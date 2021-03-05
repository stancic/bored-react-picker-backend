import "reflect-metadata";
import * as express from "express";
import router from "./routes/index";

const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/api", router);

app.listen(process.env.PORT || "3002", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3002"}`);
});
