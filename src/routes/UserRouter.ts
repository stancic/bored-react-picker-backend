import * as express from "express";
import { UserController } from "../controllers/UserController";
import { UserCreate } from "../models/UserModel";
import { bodyValidation } from "../middlewares/middleware";
import { authorize } from "../middlewares/authorization";
const userRouter = express.Router();

const userController = new UserController();
userRouter.get("", authorize, userController.getAll);
userRouter.post("/sign-up", bodyValidation(UserCreate), userController.signUp);
userRouter.post("/login", userController.login);

export default userRouter;
