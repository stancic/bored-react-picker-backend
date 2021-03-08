import * as express from "express";
import { FavoriteMovieController } from "../controllers/FavoriteMovieController";
import { bodyValidation } from "../middlewares/middleware";
import { FavoriteMovieCreate } from "../models/FavoriteMovieModel";
const favoriteMovieRouter = express.Router();

const favoriteMovieController = new FavoriteMovieController();

favoriteMovieRouter.get("", favoriteMovieController.getAll);
favoriteMovieRouter.post(
  "",
  bodyValidation(FavoriteMovieCreate),
  favoriteMovieController.addMovieToFavoriteMovies
);
favoriteMovieRouter.delete("/:id", favoriteMovieController.removeFavoriteMovie);

export default favoriteMovieRouter;
