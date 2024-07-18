import Joi from "joi";

export const userProfileSchema = Joi.object({

        profilePicture: Joi.string(),
        coverPhoto: Joi.string(),
        location: Joi.string(),
        maritalStatus: Joi.string().valid('single', 'married', 'prefer-not-to-say'),
        sex: Joi.string().valid('male', 'female'),
        about: Joi.string(),
        dateOfBirth: Joi.date(),
        contact: Joi.string(),
        resume: Joi.string(),
        languages: Joi.array().items(Joi.string()),
        gitHubLink: Joi.string(),
        linkedin: Joi.string(),
        twitter: Joi.string(),
        user: Joi.string()
    });
