import Joi from "joi";

export const experienceSchema = Joi.object({
    experience: Joi.object ({
        companyName: Joi.string(),
        role: Joi.string(),
        responsibility: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
    })
});