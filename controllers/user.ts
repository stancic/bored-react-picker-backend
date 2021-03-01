import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET ALL USERS
const getAll = async (request, response) => {
  const users = await User.findAll();
  response.json(users);
};

// CREATE USER
const signUp = async (request, response) => {
  const body = request.body;
  let userId = uuidv4();
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  const userWithUsernameExists = await User.findOne({
    where: { username: body.username },
  });
  const userWithEmailExists = await User.findOne({
    where: { email: body.email },
  });
  const user = {
    id: userId,
    username: body.username,
    email: body.email,
    password: passwordHash,
  };
  if (userWithUsernameExists || userWithEmailExists) {
    response.status(409).json({
      message: "Username or email already exists",
    });
  } else {
    try {
      let result = await User.create({
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
      });
      response.status(200).json({
        message: `User ${user.username} created`,
        result,
      });
    } catch (error) {
      response.sendStatus(500);
    }
  }
};

// LOGIN USER
const login = async (request, response) => {
  const body = request.body;
  const userEmailLogin = await User.findOne({
    where: { email: body.usernameOrEmail },
  });

  const userUsernameLogin = await User.findOne({
    where: { username: body.usernameOrEmail },
  });

  if (!(userEmailLogin || userUsernameLogin)) {
    response.status(401).json({ error: "Invalid username or email" });
  }

  if (userEmailLogin) {
    const correctPassword = null
      ? false
      : await bcrypt.compare(body.password, userEmailLogin.password);
    if (!correctPassword) {
      response.status(401).json({ error: "Invalid password" });
    } else {
      const userToken = {
        username: userEmailLogin.username,
        id: userEmailLogin.id,
      };
      const token = jwt.sign(userToken, process.env.SECRET);
      response.status(200).send({
        message: `${userEmailLogin.username} succesfully logged in`,
        token,
      });
    }
  } else if (userUsernameLogin) {
    const correctPassword = null
      ? false
      : await bcrypt.compare(body.password, userUsernameLogin.password);
    if (!correctPassword) {
      response.status(401).json({ error: "Invalid password" });
    } else {
      const userToken = {
        username: userUsernameLogin.username,
        id: userUsernameLogin.id,
      };
      const token = jwt.sign(userToken, process.env.SECRET);
      response.status(200).send({
        message: `${userUsernameLogin.username} succesfully logged in`,
        token,
      });
    }
  }
};

module.exports = {
  getAll: getAll,
  signUp: signUp,
  login: login,
};
