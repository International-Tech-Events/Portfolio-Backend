import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from "express-oas-generator";
import 'dotenv/config';
import { userRouter } from './routes/user_routes.js';
import { dbConnection } from "./config/db.js";
import session from "express-session";






// create express app

const app = express();



dbConnection();

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {secure: true},
    // store: MongoStore.create({
    //     mongoUrl: process.env.MONGO_URL
    // })
    

}));

app.use('/api/v1', userRouter)




const port = process.env.PORT || 8600;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
