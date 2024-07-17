import { Schema, model, Types} from "mongoose";

const userProfileSchema = new Schema({
    
        profilePicture: { type: String },
        coverPhoto: { type: String},
        location: { type: String },
        maritalStatus: { type: String, enum: ['single', 'married', 'prefer-not-to-say'] },
        sex: { type: String, enum: ['male', 'female'] },
        about: { type: String },
        dateOfBirth: { type: Date },
        contact: { type: String },
        resume: { type: String },
        languages: { type: String },
        gitHubLink: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
        user:{type: Types.ObjectId, ref: 'User'}

},{
    timestamps:true
})

export const userProfileModel = model('UserProfile', userProfileSchema);