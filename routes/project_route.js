import { Router } from "express";

import {  getAllProjects, createProject, updateProject, getOneProject, deleteProject } from "../controllers/project_controller.js";

export const projectRouter = Router();



projectRouter.post('/users/projects', createProject);

projectRouter.get('/users/projects', getAllProjects);

projectRouter.get('/users/projects/:projectId', getOneProject);

projectRouter.delete('/users/projects/:projectId', deleteProject);

projectRouter.patch('/users/projects/:projectId', updateProject);