import {Schema, model} from "mongoose";

const experienceSchema = new Schema({
            companyName: { type: String },
            role: { type: String },
            responsibility: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            user:{type: Types.ObjectId, ref: 'User'}



}, {
    timestamps: true
});

export const experienceModel = model('experience', experienceSchema);