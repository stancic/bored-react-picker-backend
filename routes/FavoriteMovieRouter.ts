import * as express from "express";
import { FavoriteMovieController } from "../controllers/FavoriteMovieController";
import { bodyValidation } from "../middlewares/middleware";
import { authorize } from "../middlewares/authorization";
import { FavoriteMovieCreate } from "../models/FavoriteMovieModel";
const favoriteMovieRouter = express.Router();

const favoriteMovieController = new FavoriteMovieController();

favoriteMovieRouter.get("", authorize, favoriteMovieController.getAll);
favoriteMovieRouter.post(
  "",
  authorize,
  bodyValidation(FavoriteMovieCreate),
  favoriteMovieController.addMovieToFavoriteMovies
);
favoriteMovieRouter.delete("/:id", favoriteMovieController.removeFavoriteMovie);

export default favoriteMovieRouter;
