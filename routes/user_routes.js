import {Router} from "express";
import { getUser, getUsers, login, logout, signup } from "../controllers/user_controller.js";
import { checkUserSession } from "../middlewares/auth.js";


export const userRouter = Router();

userRouter.post('/user/signup', signup);
userRouter.post('/user/login', login);
userRouter.post('/user/logout', checkUserSession, logout)
userRouter.get("/users/auth/:userName", getUser);
userRouter.get("/users",getUsers );