import * as express from "express";
import { container } from "tsyringe";
import { WatchedMovieController } from "../controllers/WatchedMovieController";
import { authorize } from "../middlewares/authorization";
import { bodyValidation } from "../middlewares/middleware";
import { WatchedMovieCreate } from "../models/WatchedMovieModel";
const watchedMovieRouter = express.Router();

const watchedMovieController = container.resolve(WatchedMovieController);
watchedMovieRouter.get(
  "",
  authorize,
  watchedMovieController.GetAllWatchedAsync
);
watchedMovieRouter.get(
  "/:userid",
  authorize,
  watchedMovieController.GetWatchedFromUser
);
watchedMovieRouter.post(
  "",
  authorize,
  bodyValidation(WatchedMovieCreate),
  watchedMovieController.AddMovieToWatchedMoviesAsync
);
watchedMovieRouter.delete(
  "/:id",
  watchedMovieController.RemoveWatchedMovieAsync
);

export default watchedMovieRouter;
