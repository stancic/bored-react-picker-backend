import * as express from "express";
import { WatchedMovieController } from "../controllers/WatchedMovieController";
const watchedMovieRouter = express.Router();

const watchedMovieController = new WatchedMovieController();
watchedMovieRouter.get("", watchedMovieController.getAll);
watchedMovieRouter.post("", watchedMovieController.addMovieToWatchedMovies);
watchedMovieRouter.delete("/:id", watchedMovieController.removeWatchedMovie);

export default watchedMovieRouter;
