import {Schema, model} from "mongoose";

const projectSchema = new Schema({

            projectName: { type: String },
            description: { type: String },
            contributors: { type: String },
            skills: { type: String },
            link: { type: String },
            nameOfInstitution: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            user:{type: Types.ObjectId, ref: 'User'},


},{
    timestamps: true
});

export const ProjectModel = model('project', projectSchema);