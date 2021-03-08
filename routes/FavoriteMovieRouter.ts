import * as express from "express";
import { FavoriteMovieController } from "../controllers/FavoriteMovieController";
const favoriteMovieRouter = express.Router();

const favoriteMovieController = new FavoriteMovieController();
favoriteMovieRouter.get("", favoriteMovieController.getAll);
favoriteMovieRouter.post("", favoriteMovieController.addMovieToFavoriteMovies);
favoriteMovieRouter.delete("/:id", favoriteMovieController.removeFavoriteMovie);

export default favoriteMovieRouter;
