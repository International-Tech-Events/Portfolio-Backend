import Joi from "joi";

export const projectSchema = Joi.object({
    projects: Joi.object ({
        projectName: Joi.string(),
        description: Joi.string(),
        contributors: Joi.string(),
        skills: Joi.string(),
        link: Joi.string().uri(), 
        nameOfInstitution: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(), 
        user: Joi.string().required()
    })

    });