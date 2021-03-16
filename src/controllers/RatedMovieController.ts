import { Request, Response } from "express";
import { RatedMovie, RatedMovieCreate } from "../models/RatedMovieModel";
import { v4 as uuidv4 } from "uuid";

export class RatedMovieController {
  getAll = async (req: Request, res: Response) => {
    const ratedMovies = await RatedMovie.findAll();
    res.json(ratedMovies);
  };

  rateMovie = async (req: Request, res: Response) => {
    const body: RatedMovieCreate = res.locals.body;
    let ratedMovieId = uuidv4();
    const ratedMovie = {
      id: ratedMovieId,
      rate: body.rate,
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
      res.status(200).json({
        message: "Movie rated",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "You've already rated this movie or you're doing something not allowed",
        ratedMovie,
      });
    }
  };
}