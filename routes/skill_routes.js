import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addSkill, deleteSkill, getAllUserSkills, updateSkill } from "../controllers/skill_controller.js";


export const skillsRouter = Router()

skillsRouter.post('/users/skills', checkUserSession, addSkill)

skillsRouter.get('/users/skills', checkUserSession, getAllUserSkills)

skillsRouter.patch('/users/skills/:skillId', checkUserSession, updateSkill)

skillsRouter.delete('/users/skills/:skillId', checkUserSession, deleteSkill)
