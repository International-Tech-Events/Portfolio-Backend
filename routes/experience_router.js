import { Router } from "express";


import { addExperience, deleteExperience, getAllUserExperience, getUserExperience, updateExperience } from "../controllers/experience_controller";

export const experienceRouter = Router()

experienceRouter.post('/user/experience', addExperience)

experienceRouter.get('/user/experience', getAllUserExperience)

experienceRouter.patch('/user/experience/:id', updateExperience)

experienceRouter.delete('/user/experience/:id', deleteExperience)

experienceRouter.get('/user/experience/:id', getUserExperience)
