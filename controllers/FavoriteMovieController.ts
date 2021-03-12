import { request, Request, Response } from "express";
import {
  FavoriteMovie,
  FavoriteMovieCreate,
} from "../models/FavoriteMovieModel";
import { v4 as uuidv4 } from "uuid";

export class FavoriteMovieController {
  getAll = async (req: Request, res: Response) => {
    const favoriteMovies = await FavoriteMovie.findAll();
    res.json(favoriteMovies);
  };

  getFromUser = async (req: Request, res: Response) => {
    const userId = req.params.userid;
    const favoriteMoviesFromUser = await FavoriteMovie.findAll({
      where: { userId: userId },
    });
    res.json(favoriteMoviesFromUser);
  };

  addMovieToFavoriteMovies = async (req: Request, res: Response) => {
    const body: FavoriteMovieCreate = res.locals.body;
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
      res.status(200).json({
        message: "Movie added to favorite movies",
        result,
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Movie is already on the list or you're doing something not allowed",
      });
    }
  };

  removeFavoriteMovie = async (req: Request, res: Response) => {
    const id = req.params.id;
    const favoriteMovie = await FavoriteMovie.destroy({
      where: { movieId: id },
    });
    res.json({
      message: "Movie removed from favorite movies",
      favoriteMovie,
    });
  };
}
