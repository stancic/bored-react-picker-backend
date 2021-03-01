import { User } from "../models/user";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET ALL USERS
const getAll = async (request, response) => {
  const users = await User.findAll();
  response.json(users);
};

module.exports = {
  getAll: getAll,
};
