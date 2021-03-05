import * as express from "express";
import * as watchedMovieController from "../controllers/WatchedMovieController";
const watchedMovieRouter = express.Router();

watchedMovieRouter.get("/all", watchedMovieController.getAll);
watchedMovieRouter.post("/add", watchedMovieController.addMovieToWatchedMovies);

export default watchedMovieRouter;
