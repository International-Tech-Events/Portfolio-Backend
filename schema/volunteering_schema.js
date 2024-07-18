import Joi from "joi";

export const volunteeringSchema = Joi.object({

        organisation: Joi.string().required(),
        description: Joi.string().required(),
        skills: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),    
        role: Joi.string().required(),
        responsibilities: Joi.string().required(),
        location: Joi.string(),
        projectName: Joi.string().required(),
        user: Joi.string()
    });