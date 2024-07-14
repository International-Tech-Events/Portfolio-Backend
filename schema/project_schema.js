import Joi from "joi";

export const projectSchema = Joi.object({

        projectName: Joi.string().required(),
        description: Joi.string().required(),
        contributors: Joi.string(),
        skills: Joi.string().required(),
        link: Joi.string().uri().required(), 
        nameOfInstitution: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date(), 
        user: Joi.string().required()
        
    });