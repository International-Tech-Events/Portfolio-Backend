import {Schema, model, Types} from "mongoose";

const volunteeringSchema = new Schema({
            organisation: { type: String },
            description: { type: String },
            skills: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String },
            projectName: { type: String },
            user: {type: Types.ObjectId, ref: 'User', select:false}


},{
    timestamps: true
}); 

export const volunteeringModel = model('Volunteering', volunteeringSchema);