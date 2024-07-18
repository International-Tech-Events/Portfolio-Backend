import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addVolunteering, deleteVolunteering, getAllUserVolunteering, getOneVolunteering, updateVolunteering } from "../controllers/volunteering_controller.js";

export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUserSession, addVolunteering);

volunteeringRouter.get('/users/volunteering', checkUserSession, getAllUserVolunteering);

volunteeringRouter.get('/users/volunteering/:volunteeringId', checkUserSession, getOneVolunteering);

volunteeringRouter.patch('/users/volunteering/:volunteeringId', checkUserSession, updateVolunteering);

volunteeringRouter.delete('/users/volunteering/:volunteeringId', checkUserSession, deleteVolunteering);
