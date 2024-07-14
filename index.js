import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from "express-oas-generator";
import 'dotenv/config';
import { userRouter } from './routes/user_routes.js';
import { educationRouter } from "./routes/education_routes.js";
import { achievementRouter } from "./routes/achievement_route.js";
import { experienceRouter } from "./routes/experience_router.js";
import { skillsRouter } from "./routes/skill_routes.js";
import { volunteeringRouter } from "./routes/volunteering_route.js";
import { dbConnection } from "./config/db.js";





// create express app

const app = express();



dbConnection();

app.use(cors());
app.use(express.json());

app.use('/api/v1', userRouter);
app.use('/api/v1', educationRouter);
app.use('/api/v1', achievementRouter);
app.use('/api/v1', experienceRouter);
app.use('/api/v1', skillsRouter);
app.use('/api/v1', volunteeringRouter);




const port = process.env.PORT || 8600;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
