import { WatchedMovie, WatchedMovieCreate } from "../models/WatchedMovieModel";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export class WatchedMovieController {
  getAll = async (request, response) => {
    const watchedMovies = await WatchedMovie.findAll();
    response.json(watchedMovies);
  };

  addMovieToWatchedMovies = async (request, response) => {
    const body = request.body;
    const watchedMovieBodyToClass = plainToClass(WatchedMovieCreate, body);

    validate(watchedMovieBodyToClass).then(async (errors) => {
      if (errors.length > 0) {
        response.status(400).json({
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
          response.status(200).json({
            message: "Movie added to watched movies",
            result,
          });
        } catch (error) {
          response.status(500).json({
            message: "Movie is already on the list",
          });
        }
      }
    });
  };
}
