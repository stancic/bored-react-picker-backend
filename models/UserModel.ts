import { DataTypes } from "sequelize";
import { sequelize } from "./index";
import {
  IsDefined,
  Length,
  MaxLength,
  Matches,
  MinLength,
  IsUUID,
} from "class-validator";

const testUsernameRegEx = /^(?=.{4,31}$)(?![_\W])(?![_\W]{2})\w+(?<!(_{1})[_\W])$/;
const testEmailRegEx = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
const testPasswordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

export class UserCreate {
  id: string;

  @IsDefined()
  @MaxLength(32, { message: "Username too long" })
  @Matches(testUsernameRegEx, { message: "Username is not in valid format." })
  username: string;

  @IsDefined()
  @MinLength(5, { message: "Email is not in valid format." })
  @Matches(testEmailRegEx, { message: "Email is not in valid format." })
  email: string;

  @IsDefined()
  @MinLength(6, { message: "Password too short" })
  @Matches(testPasswordRegEx, {
    message:
      "Password too weak (It needs have one capitalized letter and at least one number).",
  })
  password: string;
}

export const User = sequelize.define<any, any>(
  "User",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
