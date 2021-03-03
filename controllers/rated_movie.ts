import { RatedMovie, RatedMovieCreate } from "../models/rated_movie";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

export const getAll = async (request, response) => {
  const ratedMovies = await RatedMovie.findAll();
  response.json(ratedMovies);
};
