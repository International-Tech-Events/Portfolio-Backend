import { Router } from "express";

import {  getAllProjects,createProject,updateProject,deleteProject } from "../controllers/project_controller.js";

export const projectRouter = Router();

projectRouter.post('/user/projects', createProject);
projectRouter.get('/user/projects', getAllProjects);
projectRouter.delete('/user/projects/:id', deleteProject);
projectRouter.patch('/user/projects/:id', updateProject);