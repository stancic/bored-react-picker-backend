import * as express from "express";
import * as favoriteMovieController from "../controllers/FavoriteMovieController";
const favoriteMovieRouter = express.Router();

favoriteMovieRouter.get("/all", favoriteMovieController.getAll);
favoriteMovieRouter.post(
  "/add",
  favoriteMovieController.addMovieToFavoriteMovies
);

export default favoriteMovieRouter;
