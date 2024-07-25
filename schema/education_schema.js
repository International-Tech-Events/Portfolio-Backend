import Joi from "joi";

export const educationSchema = Joi.object({
        schoolName: Joi.string().required(),
        location: Joi.string().required(),
        program: Joi.string().required(),
        qualification: Joi.string().required(),
        grade: Joi.string(),
        startDate: Joi.date().required(),
        endDate: Joi.date(),
        user: Joi.string()
    });