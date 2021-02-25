const mysql = require("mysql");

const pool = mysql.createPool({
  password: "",
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_SERVER,
  port: process.env.DATABASE_PORT,
});

let database: any = {};

database.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM User", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

database.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM User WHERE Id = ?", [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};
module.exports = database;
