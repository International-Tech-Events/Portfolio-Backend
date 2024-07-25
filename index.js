import express from "express";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user_routes.js";
import { educationRouter } from "./routes/education_routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import "dotenv/config";
import { projectRouter } from "./routes/project_route.js";
import { experienceRouter } from "./routes/experience_router.js";
import { achievementRouter } from "./routes/achievement_route.js";
import { skillsRouter } from "./routes/skill_routes.js";
import { volunteeringRouter } from "./routes/volunteering_route.js";
import cors from "cors";
import { restartServer } from "./restart_server.js";
import expressOasGenerator from '@mickeymond/express-oas-generator'
import mongoose from "mongoose";
import { userProfileRouter } from "./routes/user-profile-route.js";

// create express app

const app = express();


expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth','userProfile', 'skill', 'project', 'volunteering', 'experience', 'education', 'achievement'],
    mongooseModels: mongoose.modelNames(), 
})

dbConnection();

app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true},
    store: MongoStore.create({
        mongoUrl: process.env.Mongo_url
    })
}));

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "UP" });
  });


app.use('/api/v1', userRouter);
app.use('/api/v1', educationRouter);
app.use('/api/v1', achievementRouter);
app.use('/api/v1', experienceRouter);
app.use('/api/v1', skillsRouter);
app.use('/api/v1', volunteeringRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', userProfileRouter);




expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


const port = process.env.PORT || 8600;



const reboot = async () => {
    setInterval(restartServer, process.env.INTERVAL)
    }
    
    dbConnection()
      .then(() => {
        app.listen(port, () => {
            reboot().then(() => {
            console.log(`Server Restarted`);
          });
          console.log(`Server is connected to Port ${port}`);
        });
      })
      .catch((err) => {
        console.log(err);
        process.exit(-1);
      });