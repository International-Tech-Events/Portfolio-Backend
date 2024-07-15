import { Router } from "express";

import { getProjectById, getProjects,postProject,updateProject,deleteProject } from "../controllers/project_controller.js";

export const projectRouter = Router();

projectRouter.post('/projects', postProject);
projectRouter.get('/projects', getProjects);
projectRouter.get('/projects/:id', getProjectById);
projectRouter.delete('/projects/:id', deleteProject);
projectRouter.patch('/projects/:id', updateProject);