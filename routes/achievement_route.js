import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addAchievement, deleteAchievement, getAllUserAchievement, updateAchievement } from "../controllers/achievement_controller.js";


export const achievementRouter = Router()

achievementRouter.post('/users/achievement', checkUserSession, addAchievement)

achievementRouter.get('/users/achievement', checkUserSession, getAllUserAchievement)

achievementRouter.patch('/users/achievement/:achievementId', checkUserSession, updateAchievement)

achievementRouter.delete('/users/achievement/:achievementId', checkUserSession, deleteAchievement)