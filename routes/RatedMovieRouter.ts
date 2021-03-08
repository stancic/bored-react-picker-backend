import * as express from "express";
import { RatedMovieController } from "../controllers/RatedMovieController";
import { bodyValidation } from "../middlewares/middleware";
import { RatedMovieCreate } from "../models/RatedMovieModel";
const ratedMovieRouter = express.Router();

const ratedMovieController = new RatedMovieController();
ratedMovieRouter.get("", ratedMovieController.getAll);
ratedMovieRouter.post(
  "",
  bodyValidation(RatedMovieCreate),
  ratedMovieController.rateMovie
);

export default ratedMovieRouter;
