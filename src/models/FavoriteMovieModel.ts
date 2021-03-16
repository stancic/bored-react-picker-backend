import { DataTypes } from "sequelize";
import { sequelize } from "./index";
import { IsDefined, IsNumber, IsUUID } from "class-validator";
import { IMovie } from "../types/IMovie";

export class FavoriteMovieCreate {
  id: string;

  @IsNumber()
  @IsDefined()
  movieId: number;

  @IsDefined()
  @IsUUID()
  userId: string;
}

export const FavoriteMovie = sequelize.define<any, IMovie>(
  "FavoriteMovie",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    movieId: {
      type: DataTypes.NUMBER,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);
