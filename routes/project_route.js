import { Router } from "express";

import { getAllProjects, postProject, updateProject, deleteProject } from "../controllers/project_controller.js";

export const projectRouter = Router();

projectRouter.post('/projects', postProject);
projectRouter.get('/projects', getAllProjects);
projectRouter.delete('/projects/:id', deleteProject);
projectRouter.patch('/projects/:id', updateProject);