import { Request, Response } from "express";
import { User, UserCreate } from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

export class UserController {
  getAll = async (req: Request, res: Response) => {
    const users = await User.findAll();
    res.json(users);
  };

  signUp = async (req: Request, res: Response) => {
    const body: UserCreate = res.locals.body;
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
      res.status(409).json({
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
        res.status(200).json({
          message: `User ${user.username} created`,
          result,
        });
      } catch (error) {
        res.sendStatus(500);
      }
    }
  };

  login = async (req: Request, res: Response) => {
    const body = req.body;
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
        res.status(401).json({ error: "Invalid password" });
      } else {
        const userToken = {
          username: userLogin.username,
          id: userLogin.id,
        };
        const token = jwt.sign(userToken, process.env.SECRET, {
          expiresIn: "1h",
        });
        res.status(200).send({
          message: `${userLogin.username} succesfully logged in`,
          token,
        });
      }
    } else {
      res.status(401).json({ error: "Invalid username or email" });
    }
  };
}
