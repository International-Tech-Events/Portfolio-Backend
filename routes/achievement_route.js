import { Router } from "express";


import { addAchievement, deleteAchievement, getUserAchievement, getAllUserAchievement, updateAchievement } from "../controllers/achievement_controller.js";


export const achievementRouter = Router()

achievementRouter.post('/users/achievement', addAchievement)

achievementRouter.get('/users/achievement', getAllUserAchievement)

achievementRouter.patch('/users/achievement/:id', updateAchievement)

achievementRouter.get('/users/achievement/:id', getUserAchievement)

achievementRouter.delete('/users/achievement/:id', deleteAchievement)