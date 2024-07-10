import Joi from "joi";

export const experience_schema = Joi.object({
    experience: Joi.object ({
        companyName: Joi.string(),
        role: Joi.string(),
        responsibility: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
    })
});