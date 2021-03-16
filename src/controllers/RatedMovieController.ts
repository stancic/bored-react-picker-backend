import { NextFunction, Request, Response } from "express";
import { RatedMovie, RatedMovieCreate } from "../models/RatedMovieModel";
import { v4 as uuidv4 } from "uuid";
import RatedMovieService from "../services/RatedMovieServices";
import { injectable } from "tsyringe";

@injectable()
export class RatedMovieController {
  private _ratedMovieService: RatedMovieService;

  constructor(ratedMovieService: RatedMovieService) {
    this._ratedMovieService = ratedMovieService;
  }

  GetAllRatedMoviesAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const ratedMovies = await this._ratedMovieService.FindAllRatedMoviesAsync;
    return res.status(200).json(ratedMovies);
  };

  RateMovieAsync = async (req: Request, res: Response, next: NextFunction) => {
    const body: RatedMovieCreate = res.locals.body;
    let ratedMovieId = uuidv4();
    const ratedMovie = {
      id: ratedMovieId,
      rate: body.rate,
      movieId: body.movieId,
      userId: body.userId,
    };
    try {
      let result = await this._ratedMovieService.PostAsync(ratedMovie);
      return res.status(200).json({
        message: "Movie rated",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "You've already rated this movie or you're doing something not allowed",
        ratedMovie,
      });
    }
  };
}
