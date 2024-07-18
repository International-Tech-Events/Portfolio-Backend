import Joi from "joi";

export const experienceSchema = Joi.object({
        companyName: Joi.string().required(),
        role: Joi.string().required(),
        skills: Joi.string().required(),
        responsibilities: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        user: Joi.string()
    });