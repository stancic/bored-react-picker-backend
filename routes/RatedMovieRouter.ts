import * as express from "express";
import { RatedMovieController } from "../controllers/RatedMovieController";
const ratedMovieRouter = express.Router();

const ratedMovieController = new RatedMovieController();
ratedMovieRouter.get("", ratedMovieController.getAll);
ratedMovieRouter.post("", ratedMovieController.rateMovie);

export default ratedMovieRouter;
