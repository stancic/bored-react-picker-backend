import { NextFunction, Request, Response } from "express";
import { User, UserCreate } from "../models/UserModel";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { injectable } from "tsyringe";
import UserService from "../services/UserServices";
import { IUser } from "../types/IUser";
require("dotenv").config();

@injectable()
export class UserController {
  private _userService: UserService;

  constructor(userService: UserService) {
    this._userService = userService;
  }

  GetAllUsersAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const users = await this._userService.FindAllUsersAsync();
    return res.status(200).json(users);
  };

  SignupAsync = async (req: Request, res: Response, next: NextFunction) => {
    const body: UserCreate = res.locals.body;
    let userId = uuidv4();
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    // If user exists with one username but different mail and vice versa
    const userWithUsernameExists = await this._userService.GetByUsernameAsync(
      body.username
    );
    const userWithEmailExists = await this._userService.GetByEmailAsync(
      body.username
    );

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
        let result = await this._userService.PostAsync(user);
        res.status(200).json({
          message: `User ${user.username} created`,
          user: {
            id: result.id,
            username: result.username,
            email: result.email,
          },
        });
      } catch (error) {
        res.sendStatus(500);
      }
    }
  };

  LoginAsync = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    let userLogin: IUser;
    if (body.usernameOrEmail.includes("@")) {
      userLogin = await this._userService.GetByEmailAsync(body.usernameOrEmail);
    } else {
      userLogin = await this._userService.GetByUsernameAsync(
        body.usernameOrEmail
      );
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
          user: {
            id: userLogin.id,
            username: userLogin.username,
            email: userLogin.email,
          },
          token,
        });
      }
    } else {
      res.status(401).json({ error: "Invalid username or email" });
    }
  };
}
