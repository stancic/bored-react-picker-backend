import { injectable } from "tsyringe";
import { WatchedMovie } from "../models/WatchedMovieModel";
import { IMovie } from "../types/IMovie";

@injectable()
export default class WatchedMovieService {
  FindAllWatchedMoviesAsync = async (): Promise<Array<IMovie>> => {
    return WatchedMovie.findAll();
  };

  GetByUserIdAsync = async (
    userId: string
  ): Promise<Array<IMovie> | IMovie> => {
    return WatchedMovie.findAll({ where: { userId: userId } });
  };

  PostAsync = async (movie: IMovie): Promise<IMovie> => {
    return WatchedMovie.create(movie);
  };

  RemoveByMovieIdAsync = async (id: string): Promise<number> => {
    return WatchedMovie.destroy({ where: { id: id } });
  };
}
