import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user: {
        firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String },
    password: { type: String },
    userName: { type: String, unique: true },
    termsAndCondition: { type: Boolean },
},

});


export const User = model('User', userSchema);