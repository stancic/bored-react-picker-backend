const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET ALL USERS
const getAll = (request, response) => {
  models.User.findAll()
    .then((users) => {
      response.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getAll: getAll,
};
