import { User, UserCreate } from "../models/user";
import { plainToClass } from "class-transformer";
import { validate, validateOrReject } from "class-validator";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

// GET ALL USERS
const getAll = async (request, response) => {
  const users = await User.findAll();
  response.json(users);
};

// CREATE USER
const signUp = async (request, response) => {
  const body = request.body;
  let userBodyToClass = plainToClass(UserCreate, body);

  validate(userBodyToClass).then(async (errors) => {
    if (errors.length > 0) {
      response.status(400).json({
        message: "Validation failed.",
        errors,
      });
    } else {
      let userId = uuidv4();
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(body.password, saltRounds);

      // If user exists with one username but different mail and vice versa
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
    }
  });
};

// LOGIN USER
const login = async (request, response) => {
  const body = request.body;
  let userLogin;
  if (body.usernameOrEmail.includes("@")) {
    userLogin = await User.findOne({
      where: { email: body.usernameOrEmail },
    });
  } else {
    userLogin = await User.findOne({
      where: { username: body.usernameOrEmail },
    });
  }
  if (userLogin) {
    const correctPassword = null
      ? false
      : await bcrypt.compare(body.password, userLogin.password);
    if (!correctPassword) {
      response.status(401).json({ error: "Invalid password" });
    } else {
      const userToken = {
        username: userLogin.username,
        id: userLogin.id,
      };
      const token = jwt.sign(userToken, process.env.SECRET);
      response.status(200).send({
        message: `${userLogin.username} succesfully logged in`,
        token,
      });
    }
  } else {
    response.status(401).json({ error: "Invalid username or email" });
  }
};

module.exports = {
  getAll: getAll,
  signUp: signUp,
  login: login,
};
