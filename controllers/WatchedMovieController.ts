import { Request, Response } from "express";
import { WatchedMovie, WatchedMovieCreate } from "../models/WatchedMovieModel";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export class WatchedMovieController {
  getAll = async (req: Request, res: Response) => {
    const watchedMovies = await WatchedMovie.findAll();
    res.json(watchedMovies);
  };

  addMovieToWatchedMovies = async (req: Request, res: Response) => {
    const body = req.body;
    const watchedMovieBodyToClass = plainToClass(WatchedMovieCreate, body);

    validate(watchedMovieBodyToClass).then(async (errors) => {
      if (errors.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          errors,
        });
      } else {
        let watchedMovieId = uuidv4();
        const watchedMovie = {
          id: watchedMovieId,
          movieId: body.movieId,
          userId: body.userId,
        };
        try {
          let result = await WatchedMovie.create({
            id: watchedMovie.id,
            movieId: watchedMovie.movieId,
            userId: watchedMovie.userId,
          });
          res.status(200).json({
            message: "Movie added to watched movies",
            result,
          });
        } catch (error) {
          res.status(500).json({
            message: "Movie is already on the list",
          });
        }
      }
    });
  };

  removeWatchedMovie = async (req: Request, res: Response) => {
    const id = req.params.id;
    const watchedMovie = await WatchedMovie.destroy({ where: { id: id } });
    res.json({
      message: "Movie removed from watched movies",
    });
  };
}
