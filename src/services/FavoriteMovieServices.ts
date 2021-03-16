import { injectable } from "tsyringe";
import { FavoriteMovie } from "../models/FavoriteMovieModel";
import { IMovie } from "../types/IMovie";

@injectable()
export default class FavoriteMovieService {
  FindAllFavoriteMoviesAsync = async (): Promise<Array<IMovie>> => {
    return FavoriteMovie.findAll();
  };

  GetByUserIdAsync = async (
    userId: string
  ): Promise<Array<IMovie> | IMovie> => {
    return FavoriteMovie.findAll({ where: { userId: userId } });
  };

  PostAsync = async (movie: IMovie): Promise<IMovie> => {
    return FavoriteMovie.create(movie);
  };

  RemoveByMovieIdAsync = async (id: string): Promise<number> => {
    return FavoriteMovie.destroy({ where: { id: id } });
  };
}
