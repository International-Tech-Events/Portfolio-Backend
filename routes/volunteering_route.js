import { Router } from "express";


import { addVolunteering, deleteVolunteering, getAllUserVolunteering, getUserVolunteering, updateVolunteering } from "../controllers/volunteering_controller.js";

export const volunteeringRouter = Router()

volunteeringRouter.post('/user/volunteering', addVolunteering)

volunteeringRouter.get('/user/volunteering', getAllUserVolunteering)

volunteeringRouter.patch('/user/volunteering/:id', updateVolunteering)

volunteeringRouter.delete('/user/volunteering/:id', deleteVolunteering)

volunteeringRouter.get('/user/volunteering/:id', getUserVolunteering)