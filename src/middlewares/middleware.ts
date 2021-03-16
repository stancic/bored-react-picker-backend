import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export const bodyValidation = (creationClass: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let instanceOfCreationClass = plainToClass(creationClass, req.body);
  validate(instanceOfCreationClass).then((errors) => {
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors,
      });
    } else {
      res.locals.body = instanceOfCreationClass;
      next();
    }
  });
};
