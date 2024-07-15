import { Router } from "express";

import {  getAllProjects,createProject,updateProject,deleteProject } from "../controllers/project_controller.js";

export const projectRouter = Router();

projectRouter.post('/projects', createProject);
projectRouter.get('/projects', getAllProjects);
projectRouter.delete('/projects/:id', deleteProject);
projectRouter.patch('/projects/:id', updateProject);