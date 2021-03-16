import * as express from "express";
import { UserController } from "../controllers/UserController";
import { UserCreate } from "../models/UserModel";
import { bodyValidation } from "../middlewares/middleware";
import { authorize } from "../middlewares/authorization";
import { container } from "tsyringe";
const userRouter = express.Router();

const userController = container.resolve(UserController);

userRouter.get("", authorize, userController.GetAllUsersAsync);
userRouter.post(
  "/sign-up",
  bodyValidation(UserCreate),
  userController.SignupAsync
);
userRouter.post("/login", userController.LoginAsync);

export default userRouter;
