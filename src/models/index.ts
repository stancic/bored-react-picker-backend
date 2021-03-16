import { Dialect, Sequelize } from "sequelize";
require("dotenv").config();

const config = {
  database: process.env.DATABASE_NAME || "bored_movie_picker",
  username: process.env.DATABASE_USERNAME || "root",
  password: process.env.DATABASE_PASSWORD || "",
  dialect: process.env.DATABASE_DIALECT || "mysql",
};

console.log(config);

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect as Dialect,
    port: 3306,
  }
);

sequelize.authenticate();
