import { Router } from "express";


import { addSkill, deleteSkill, getAllUserSkills, getUserSkill, updateSkill } from "../controllers/skill_controller.js";


export const skillsRouter = Router()

skillsRouter.post('/user/skills', addSkill)

skillsRouter.get('/user/skills', getAllUserSkills)

skillsRouter.patch('/user/skills/:id', updateSkill)

skillsRouter.delete('/user/skills/:id', deleteSkill)

skillsRouter.get('/user/skills/:id', getUserSkill)