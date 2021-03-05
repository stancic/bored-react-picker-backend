import * as express from "express";
import { FavoriteMovieController } from "../controllers/FavoriteMovieController";
const favoriteMovieRouter = express.Router();

const favoriteMovieController = new FavoriteMovieController();
favoriteMovieRouter.get("/all", favoriteMovieController.getAll);
favoriteMovieRouter.post(
  "/add",
  favoriteMovieController.addMovieToFavoriteMovies
);

export default favoriteMovieRouter;
