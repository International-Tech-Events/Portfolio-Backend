import {Schema, model, Types} from "mongoose";

const achievementSchema = new Schema({
            awardName: { type: String },
            description: { type: String },
            image: { type: String },
            date: { type: String },
            awardingInstitution: { type: String },
            user:{type: Types.ObjectId, ref: 'User'}



}, {
    timestamps:true
});

export const achievementModel = model('Achievement', achievementSchema);

