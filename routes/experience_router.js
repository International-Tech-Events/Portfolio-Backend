import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addExperience, deleteExperience, getAllUserExperience, updateExperience } from "../controllers/experience_controller.js";

export const experienceRouter = Router()

experienceRouter.post('/user/experience', checkUserSession, addExperience)

experienceRouter.get('/user/experience', checkUserSession, getAllUserExperience)

experienceRouter.patch('/user/experience/:experienceId', checkUserSession, updateExperience)

experienceRouter.delete('/user/experience/:experienceId', checkUserSession, deleteExperience)


