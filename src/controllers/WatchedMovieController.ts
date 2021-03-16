import { NextFunction, Request, Response } from "express";
import { WatchedMovie, WatchedMovieCreate } from "../models/WatchedMovieModel";
import { v4 as uuidv4 } from "uuid";
import { injectable } from "tsyringe";
import WatchedMovieService from "../services/WatchedMovieServices";

@injectable()
export class WatchedMovieController {
  private _watchedMovieService: WatchedMovieService;

  constructor(watchedMovieService: WatchedMovieService) {
    this._watchedMovieService = watchedMovieService;
  }

  GetAllWatchedAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const watchedMovies = await this._watchedMovieService
      .FindAllWatchedMoviesAsync;
    return res.status(200).json(watchedMovies);
  };

  GetWatchedFromUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.userid;
    const watchedMoviesFromUser = await this._watchedMovieService.GetByUserIdAsync(
      userId
    );
    return res.status(200).json(watchedMoviesFromUser);
  };

  AddMovieToWatchedMoviesAsync = async (
    req: Request,
    res: Response,
    next: Function
  ) => {
    const body: WatchedMovieCreate = res.locals.body;
    let watchedMovieId = uuidv4();
    const watchedMovie = {
      id: watchedMovieId,
      movieId: body.movieId,
      userId: body.userId,
    };
    try {
      let result = await this._watchedMovieService.PostAsync(watchedMovie);
      return res.status(200).json({
        message: "Movie added to watched movies",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Movie is already on the list or you're doing something not allowed.",
      });
    }
  };

  RemoveWatchedMovieAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const watchedMovie = await this._watchedMovieService.RemoveByMovieIdAsync(
      id
    );
    return res.status(204).json({
      message: "Movie removed from watched movies",
      watchedMovie,
    });
  };
}
