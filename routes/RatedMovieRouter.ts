import * as express from "express";
import * as RatedMovieController from "../controllers/RatedMovieController";
const ratedMovieRouter = express.Router();

ratedMovieRouter.get("/all", RatedMovieController.getAll);
ratedMovieRouter.post("/rate", RatedMovieController.rateMovie);

export default ratedMovieRouter;
