import { Schema, model, Types } from "mongoose";

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String,  lowercase: true, unique: true },
    password: { type: String },
    userName: { type: String,  lowercase: true, unique:true },
    termsAndConditions: { type: Boolean },
    userProfile: { type: Types.ObjectId, ref: 'UserProfile', unique: true},
    education: [{ type: Types.ObjectId, ref: 'Education' }],
    achievement: [{ type: Types.ObjectId, ref: 'Achievement' }],
    project: [{ type: Types.ObjectId, ref: 'Project' }],
    skill: [{ type: Types.ObjectId, ref: 'Skill' }],
    experience: [{ type: Types.ObjectId, ref: 'Experience' }],
    volunteering: [{ type: Types.ObjectId, ref: 'Volunteering' }],
});
export const userModel = model("User", userSchema);