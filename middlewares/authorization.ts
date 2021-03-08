import { Request, Response, NextFunction, request } from "express";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (error) => {
      if (error) {
        res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
