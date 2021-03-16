import * as express from "express";
import { FavoriteMovieController } from "../controllers/FavoriteMovieController";
import { bodyValidation } from "../middlewares/middleware";
import { authorize } from "../middlewares/authorization";
import { FavoriteMovieCreate } from "../models/FavoriteMovieModel";
import { container } from "tsyringe";
const favoriteMovieRouter = express.Router();

const favoriteMovieController = container.resolve(FavoriteMovieController);

favoriteMovieRouter.get(
  "",
  authorize,
  favoriteMovieController.GetAllFavoritesAsync
);
favoriteMovieRouter.get(
  "/:userid",
  authorize,
  favoriteMovieController.GetFavoritesFromUserAsync
);
favoriteMovieRouter.post(
  "",
  authorize,
  bodyValidation(FavoriteMovieCreate),
  favoriteMovieController.AddMovieToFavoriteMoviesAsync
);
favoriteMovieRouter.delete(
  "/:id",
  favoriteMovieController.RemoveFavoriteMovieAsync
);

export default favoriteMovieRouter;
