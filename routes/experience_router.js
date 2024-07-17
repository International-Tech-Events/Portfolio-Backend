import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addExperience, deleteExperience, getAllUserExperience, updateExperience } from "../controllers/experience_controller.js";

export const experienceRouter = Router()

experienceRouter.post('/users/experience', checkUserSession, addExperience)

experienceRouter.get('/users/experience', checkUserSession, getAllUserExperience)

experienceRouter.patch('/users/experience/:experienceId', checkUserSession, updateExperience)

experienceRouter.delete('/users/experience/:experienceId', checkUserSession, deleteExperience)


