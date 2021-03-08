import * as express from "express";
import { UserController } from "../controllers/UserController";
import { UserCreate } from "../models/UserModel";
import { bodyValidation } from "../middlewares/middleware";
const userRouter = express.Router();

const userController = new UserController();
userRouter.get("", userController.getAll);
userRouter.post("/sign-up", bodyValidation(UserCreate), userController.signUp);
userRouter.post("/login", userController.login);

export default userRouter;
