import {Schema, model} from "mongoose";

const volunteeringSchema = new Schema({
            organization: { type: String },
            description: { type: String },
            skills: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String },
            projectName: { type: String },


},{
    timestamps: true
}); 

export const volunteeringModel = model('volunteer', volunteeringSchema);