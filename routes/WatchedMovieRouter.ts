import * as express from "express";
import { WatchedMovieController } from "../controllers/WatchedMovieController";
import { bodyValidation } from "../middlewares/middleware";
import { WatchedMovieCreate } from "../models/WatchedMovieModel";
const watchedMovieRouter = express.Router();

const watchedMovieController = new WatchedMovieController();
watchedMovieRouter.get("", watchedMovieController.getAll);
watchedMovieRouter.post(
  "",
  bodyValidation(WatchedMovieCreate),
  watchedMovieController.addMovieToWatchedMovies
);
watchedMovieRouter.delete("/:id", watchedMovieController.removeWatchedMovie);

export default watchedMovieRouter;
