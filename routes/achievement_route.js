import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addAchievement, deleteAchievement, getAllUserAchievement, getOneAchievement, updateAchievement } from "../controllers/achievement_controller.js";

import { remoteUpload } from "../middlewares/uploads.js"


export const achievementRouter = Router()

achievementRouter.post('/users/achievement', remoteUpload.single('image'), checkUserSession, addAchievement);

achievementRouter.get('/users/achievement', checkUserSession, getAllUserAchievement);

achievementRouter.get('/users/achievement/:achievementId', checkUserSession, getOneAchievement);

achievementRouter.patch('/users/achievement/:achievementId', remoteUpload.single('image'), checkUserSession, updateAchievement);

achievementRouter.delete('/users/achievement/:achievementId', checkUserSession, deleteAchievement);