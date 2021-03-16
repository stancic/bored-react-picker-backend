import { injectable } from "tsyringe";
import { RatedMovie } from "../models/RatedMovieModel";
import { IMovie } from "../types/IMovie";

@injectable()
export default class RatedMovieService {
  FindAllRatedMoviesAsync = async (): Promise<Array<IMovie>> => {
    return RatedMovie.findAll();
  };

  PostAsync = async (movie: IMovie): Promise<IMovie> => {
    return RatedMovie.create(movie);
  };
}
