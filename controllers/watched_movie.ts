import { WatchedMovie, WatchedMovieCreate } from "../models/watched_movie";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

// GET ALL WATCHED MOVIES
export const getAll = async (request, response) => {
  const watchedMovies = await WatchedMovie.findAll();
  response.json(watchedMovies);
};
