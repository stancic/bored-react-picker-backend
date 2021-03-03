import * as express from "express";
import * as favoriteMovieController from "../controllers/favorite_movie";
const router = express.Router();

router.get("/favoriteMovies/all", favoriteMovieController.getAll);
router.post(
  "/favoriteMovies/add",
  favoriteMovieController.addMovieToFavoriteMovies
);

module.exports = router;
