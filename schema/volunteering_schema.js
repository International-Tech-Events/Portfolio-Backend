import Joi from "joi";

export const volunteeringSchema = Joi.object({
    volunteering: Joi.object ({
        organization: Joi.string().required(),
        description: Joi.string(),
        skills: Joi.string().required(),
        startDate: Joi.date(),
        endDate: Joi.date(),    
        role: Joi.string().required(),
        responsibility: Joi.string(),
        location: Joi.string(),
        projectName: Joi.string().required()
    })

    });