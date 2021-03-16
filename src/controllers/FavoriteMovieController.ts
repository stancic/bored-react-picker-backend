import { NextFunction, Request, Response } from "express";
import { FavoriteMovieCreate } from "../models/FavoriteMovieModel";
import { v4 as uuidv4 } from "uuid";
import FavoriteMovieService from "../services/FavoriteMovieServices";
import { injectable } from "tsyringe";

@injectable()
export class FavoriteMovieController {
  private _favoriteMoviesService: FavoriteMovieService;

  constructor(favoriteMovieService: FavoriteMovieService) {
    this._favoriteMoviesService = favoriteMovieService;
  }

  GetAllFavoritesAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const favoriteMovies = await this._favoriteMoviesService
      .FindAllFavoriteMoviesAsync;
    return res.status(200).json(favoriteMovies);
  };

  GetFavoritesFromUserAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.userid;
    const favoriteMoviesFromUser = await this._favoriteMoviesService.GetByUserIdAsync(
      userId
    );
    return res.status(200).json(favoriteMoviesFromUser);
  };

  AddMovieToFavoriteMoviesAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const body: FavoriteMovieCreate = res.locals.body;
    let favoriteMovieId = uuidv4();
    const favoriteMovie = {
      id: favoriteMovieId,
      movieId: body.movieId,
      userId: body.userId,
    };
    try {
      let result = await this._favoriteMoviesService.PostAsync(favoriteMovie);
      return res.status(200).json({
        message: "Movie added to favorite movies",
        result,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Movie is already on the list or you're doing something not allowed",
      });
    }
  };

  RemoveFavoriteMovieAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const favoriteMovie = this._favoriteMoviesService.RemoveByMovieIdAsync(id);
    return res.status(204).json({
      message: "Movie removed from favorite movies",
      favoriteMovie,
    });
  };
}
