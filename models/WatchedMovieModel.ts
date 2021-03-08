import { DataTypes } from "sequelize";
import { sequelize } from "./index";
import { IsDefined, IsInt, IsUUID } from "class-validator";

export class WatchedMovieCreate {
  @IsUUID()
  @IsDefined()
  id: string;

  @IsInt()
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
