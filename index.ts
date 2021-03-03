import "reflect-metadata";
import * as express from "express";
const userRoutes = require("./routes/user");
const watchedMovieRoutes = require("./routes/watched_movie");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", watchedMovieRoutes);
app.listen(process.env.PORT || "3002", () => {
  console.log(`Server is running on port: ${process.env.PORT || "3002"}`);
});
