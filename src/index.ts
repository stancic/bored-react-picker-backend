import "reflect-metadata";
import * as express from "express";
import router from "./routes/index";
import * as cors from "cors";

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(process.env.PORT || "3002", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3002"}`);
});
