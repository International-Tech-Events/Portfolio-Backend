import { Schema, model, Types} from "mongoose";

const userProfileSchema = new Schema({
    userProfile: {
        profilePicture: { type: String },
        location: { type: String },
        martalStatus: { type: String, enum: ['single', 'married', 'prefer-not-to-say'] },
        sex: { type: String, enum: ['male', 'female'] },
        bio: { type: String },
        about: { type: String },
        dateOfBirth: { type: Date },
        contact: { type: String },
        resume: { type: String },
        languages: { type: String },
        gitHubLink: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        user:{type: Types.ObjectId, ref: 'User'}


    },
})

export const userProfileModel = model('userProfile', userProfileSchema);