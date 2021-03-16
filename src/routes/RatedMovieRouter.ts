import * as express from "express";
import { container } from "tsyringe";
import { RatedMovieController } from "../controllers/RatedMovieController";
import { authorize } from "../middlewares/authorization";
import { bodyValidation } from "../middlewares/middleware";
import { RatedMovieCreate } from "../models/RatedMovieModel";
const ratedMovieRouter = express.Router();

const ratedMovieController = container.resolve(RatedMovieController);
ratedMovieRouter.get(
  "",
  authorize,
  ratedMovieController.GetAllRatedMoviesAsync
);
ratedMovieRouter.post(
  "",
  authorize,
  bodyValidation(RatedMovieCreate),
  ratedMovieController.RateMovieAsync
);

export default ratedMovieRouter;
