import mongoose from "mongoose";

import 'dotenv/config'

const connectionString = process.env.Mongo_url



export const dbConnection = () => {
   try {
     mongoose.connect(connectionString).then(() => {
         console.log('Database is connected')
     })
   } catch (error) {
    console.log(error)
   }
}