import { RatedMovie, RatedMovieCreate } from "../models/RatedMovieModel";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export const getAll = async (request, response) => {
  const ratedMovies = await RatedMovie.findAll();
  response.json(ratedMovies);
};

export const rateMovie = async (request, response) => {
  const body = request.body;
  const ratedMovieBodyToClass = plainToClass(RatedMovieCreate, body);

  validate(ratedMovieBodyToClass).then(async (errors) => {
    if (errors.length > 0) {
      response.status(400).json({
        message: "Validation error",
        errors,
      });
    } else {
      let ratedMovieId = uuidv4();
      const ratedMovie = {
        id: ratedMovieId,
        rate: Math.round(body.rate),
        movieId: body.movieId,
        userId: body.userId,
      };
      try {
        let result = await RatedMovie.create({
          id: ratedMovie.id,
          rate: ratedMovie.rate,
          movieId: ratedMovie.movieId,
          userId: ratedMovie.userId,
        });
        response.status(200).json({
          message: "Movie rated",
          result,
        });
      } catch (error) {
        response.status(500).json({
          message: "You've already rated this movie",
        });
      }
    }
  });
};
