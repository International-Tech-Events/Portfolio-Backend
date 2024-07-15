import Joi from "joi";

export const userProfileSchema = Joi.object({

        profilePicture: Joi.string(),
        location: Joi.string(),
        maritalStatus: Joi.string().valid('single', 'married', 'prefer-not-to-say'),
        sex: Joi.string().valid('male', 'female').required(),
        about: Joi.string(),
        dateOfBirth: Joi.date(),
        contact: Joi.string().required(),
        resume: Joi.string().required(),
        languages: Joi.array().items(Joi.string()),
        // user: Joi.string().required()
    });
