import { Router } from "express";

import { checkUserSession } from "../middlewares/auth.js";

import { addVolunteering, deleteVolunteering, getAllUserVolunteering, updateVolunteering } from "../controllers/volunteering_controller.js";

export const volunteeringRouter = Router()

volunteeringRouter.post('/user/volunteering', checkUserSession, addVolunteering)

volunteeringRouter.get('/user/volunteering', checkUserSession, getAllUserVolunteering)

volunteeringRouter.patch('/user/volunteering/:volunteeringId', checkUserSession, updateVolunteering)

volunteeringRouter.delete('/user/volunteering/:volunteeringId', checkUserSession, deleteVolunteering)
