import * as express from "express";
import { UserController } from "../controllers/UserController";
const userRouter = express.Router();

const userController = new UserController();
userRouter.get("/", userController.getAll);
userRouter.post("/sign-up", userController.signUp);
userRouter.post("/login", userController.login);

export default userRouter;
