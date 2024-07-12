import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    termsAndConditions: { type: Boolean },
    education: [{ type: Schema.Types.ObjectId, ref: 'Education' }],
    skill: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    achievement: [{ type: Schema.Types.ObjectId, ref: 'Achievement' }],
    project: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    userProfile: [{ type: Schema.Types.ObjectId, ref: 'UserProfile' }],
    volunteering: [{ type: Schema.Types.ObjectId, ref: 'Volunteering' }],
    experience: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
});


export const User = model('User', userSchema);