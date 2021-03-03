import * as express from "express";
import * as watchedMovieController from "../controllers/watched_movie";
const router = express.Router();

router.get("/watchedMovies/all", watchedMovieController.getAll);
router.post(
  "/watchedMovies/add",
  watchedMovieController.addMovieToWatchedMovies
);

module.exports = router;