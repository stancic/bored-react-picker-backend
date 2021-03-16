import { DataTypes } from "sequelize";
import { sequelize } from "./index";
import { IsDefined, IsNumber, IsUUID } from "class-validator";

export class WatchedMovieCreate {
  id: string;

  @IsNumber()
  @IsDefined()
  movieId: number;

  @IsUUID()
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
