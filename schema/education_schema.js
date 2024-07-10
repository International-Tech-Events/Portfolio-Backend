import Joi from "joi";

export const experience_schema = Joi.object({
    experience: Joi.object ({
        schoolName: Joi.string().required(),
        location: Joi.string().required(),
        program: Joi.string().required(),
        qualification: Joi.string().required(),
        grade: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date()
    })

    });