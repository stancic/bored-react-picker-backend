import { DataTypes } from "sequelize";
import { sequelize } from "./index";
import { IsDefined } from "class-validator";

export class RatedMovieCreate {
  id: string;

  @IsDefined()
  rate: number;

  @IsDefined()
  movieId: number;

  @IsDefined()
  userId: string;
}

export const RatedMovie = sequelize.define<any, any>(
  "RatedMovie",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL,
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
