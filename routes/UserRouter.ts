import * as express from "express";
import * as userController from "../controllers/UserController";
const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAll);
userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);

export default userRouter;
