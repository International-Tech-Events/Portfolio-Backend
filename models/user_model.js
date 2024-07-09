import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user: {
        firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    email: { type: String },
    password: { type: String },
    userName: { type: String, unique: true },
    termsAndCondition: { type: Boolean },
},

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


    },

    socials: {
        gitHubLink: { type: String },
        linkedin: { type: String },
        twitter: { type: String },
    },

    skills:
        [
            {
                name: { type: String },
                levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
            }
        ],

    experience: [
        {
            companyName: { type: String },
            role: { type: String },
            responsibility: { type: String },
            startDate: { type: String },
            endDate: { type: String },

        }
    ],

    education: [
        {
            schoolName: { type: String },
            location: { type: String },
            program: { type: String },
            qualification: { type: String },
            grade: { type: String },
            startDate: { type: String },
            endDate: { type: String },


        }
    ],

    achievement: [
        {
            awards: { type: String },
            description: { type: String },
            image: { type: String },
            date: { type: String },
            nameOfInstitution: { type: String },


        }
    ],

    projects: [
        {
            projectName: { type: String },
            description: { type: String },
            contributors: { type: String },
            skills: { type: String },
            link: { type: String },
            nameOfInstitution: { type: String },
            startDate: { type: String },
            endDate: { type: String },

        }
    ],

    voluntering: [
        {
            organization: { type: String },
            description: { type: String },
            skills: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String },
            projectName: { type: String },
        }
    ]


})


export const User = model('user', userSchema);