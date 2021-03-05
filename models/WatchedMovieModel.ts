import { DataTypes } from "sequelize";
import { sequelize } from "./index";
import { IsDefined } from "class-validator";

export class WatchedMovieCreate {
  id: string;

  @IsDefined()
  movieId: number;

  @IsDefined()
  userId: string;
}

export const WatchedMovie = sequelize.define<any, any>(
  "WatchedMovie",
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
