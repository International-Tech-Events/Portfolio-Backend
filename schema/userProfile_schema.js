import Joi from "joi";

export const userProfile_schema = Joi.object({
    userProfile: Joi.object ({
        profilePicture: Joi.string(),
        location: Joi.string(),
        maritalStatus: Joi.string().valid['single', 'married', 'prefer-not-to-say'],
        sex: Joi.string().valid['male', 'female'],
        bio: Joi.string().required(),
        about: Joi.string().required(),
        dateOfBirth: Joi.date(),
        contact: Joi.string().required(),
        resume: Joi.string().required(),
        languages: Joi.array()

    })
    
});