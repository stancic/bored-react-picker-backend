import {
  FavoriteMovie,
  FavoriteMovieCreate,
} from "../models/FavoriteMovieModel";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export const getAll = async (request, response) => {
  const favoriteMovies = await FavoriteMovie.findAll();
  response.json(favoriteMovies);
};

export const addMovieToFavoriteMovies = async (request, response) => {
  const body = request.body;
  const favoriteMovieBodyToClass = plainToClass(FavoriteMovieCreate, body);

  validate(favoriteMovieBodyToClass).then(async (errors) => {
    if (errors.length > 0) {
      response.status(400).json({
        message: "Validation failed",
        errors,
      });
    } else {
      let favoriteMovieId = uuidv4();
      const favoriteMovie = {
        id: favoriteMovieId,
        movieId: body.movieId,
        userId: body.userId,
      };
      try {
        let result = await FavoriteMovie.create({
          id: favoriteMovie.id,
          movieId: favoriteMovie.movieId,
          userId: favoriteMovie.userId,
        });
        response.status(200).json({
          message: "Movie added to favorite movies",
          result,
        });
      } catch (error) {
        response.status(500).json({
          message:
            "Movie is already on the list or you're doing somethin not allowed",
        });
      }
    }
  });
};
