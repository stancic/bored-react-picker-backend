const mysql = require("mysql");

const pool = mysql.createPool({
  password: "",
  user: "root",
  database: "bored_movie_picker",
  host: "localhost",
  port: "3306",
});

let database: any = {};

database.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM User", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

database.getOne = (Username: string, Email: string) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM User WHERE Username = ? OR Email = ?",
      [Username, Email],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

database.signUp = (
  Id: string,
  Email: string,
  Username: string,
  Password: string
) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO User (Id, Email, Username, Password) VALUES (?, ?, ?, ?)",
      [Id, Username, Email, Password],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
};
module.exports = database;
