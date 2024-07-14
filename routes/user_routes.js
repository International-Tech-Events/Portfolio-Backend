import {Router} from "express";
import {signup ,login}from "../controllers/user_controller.js";


export const userRouter = Router();

userRouter.post('/user/signup', signup);
userRouter.post('/user/login', login);

