import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addAchievement, deleteAchievement, getAllUserAchievement, updateAchievement } from "../controllers/achievement_controller.js";

import { remoteUpload } from "../middlewares/uploads.js"


export const achievementRouter = Router()

achievementRouter.post('/user/achievement', remoteUpload.single('image'), checkUserSession, addAchievement)

achievementRouter.get('/user/achievement', checkUserSession, getAllUserAchievement)

achievementRouter.patch('/user/achievement/:achievementId', remoteUpload.single('image'), checkUserSession, updateAchievement)

achievementRouter.delete('/user/achievement/:achievementId', checkUserSession, deleteAchievement)