import { Schema, model, Types } from "mongoose";

const projectSchema = new Schema({
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    contributors: { type: String },
    skills: { type: String },
    link: { type: String },
    nameOfInstitution: { type: String },
    startDate: { type: Date }, 
    endDate: { type: Date }, 
    user: { type: Types.ObjectId, ref: 'User', select:false },
}, {
    timestamps: true
});

export const ProjectModel = model('Project', projectSchema);