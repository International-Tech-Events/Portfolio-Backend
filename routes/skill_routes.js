import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addSkill, deleteSkill, getAllUserSkills, updateSkill } from "../controllers/skill_controller.js";


export const skillsRouter = Router()

skillsRouter.post('/user/skills', checkUserSession, addSkill)

skillsRouter.get('/user/skills', checkUserSession, getAllUserSkills)

skillsRouter.patch('/user/skills/:skillId', checkUserSession, updateSkill)

skillsRouter.delete('/user/skills/:skillId', checkUserSession, deleteSkill)
