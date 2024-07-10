import {Schema, model} from "mongoose";

const achievementSchema = new Schema({
            awards: { type: String },
            description: { type: String },
            image: { type: String },
            date: { type: String },
            nameOfInstitution: { type: String },
            user:{type: Types.ObjectId, ref: 'User'},



}, {
    timestamps:true
});

export const achievementModel = model('achievemet', achievementSchema);

