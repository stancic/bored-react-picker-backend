import * as express from "express";
import * as RatedMovieController from "../controllers/rated_movie";
const router = express.Router();

router.get("/ratedMovies/all", RatedMovieController.getAll);
router.post("/ratedMovies/rate", RatedMovieController.rateMovie);

module.exports = router;
