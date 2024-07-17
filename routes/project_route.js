import { Router } from "express";

import {  getAllProjects,createProject,updateProject,deleteProject } from "../controllers/project_controller.js";

export const projectRouter = Router();



projectRouter.post('/users/projects', createProject);

projectRouter.get('/users/projects', getAllProjects);

projectRouter.delete('/users/projects/:id', deleteProject);

projectRouter.patch('/users/projects/:id', updateProject);