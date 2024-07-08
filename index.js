import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from "express-oas-generator";
import 'dotenv/config'
import { dbConnection } from "./config/db.js";

const app = express();


dbConnection();

app.use(cors());
app.use(express.json());




const port = process.env.PORT || 8600;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
