import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addEducation, deleteEducation, getAllUserEducation, updateEducation} from "../controllers/education_controller.js";


export const educationRouter = Router()

educationRouter.post('/users/education', checkUserSession, addEducation)

educationRouter.get('/users/education/', checkUserSession, getAllUserEducation)

educationRouter.patch('/users/education/:educationId', checkUserSession, updateEducation)

educationRouter.delete('/users/education/:educationId', checkUserSession, deleteEducation)
