import { Router } from "express";


import { addEducation, deleteEducation, getAllUserEducation, getUserEducation, updateEducation} from "../controllers/education_controller.js";


export const educationRouter = Router()

educationRouter.post('/users/education', addEducation)

educationRouter.get('/users/education/:id', getAllUserEducation)

educationRouter.patch('/users/education/:id', updateEducation)

educationRouter.delete('/users/education/:id', deleteEducation)

educationRouter,get('/users/education/:id', getUserEducation)