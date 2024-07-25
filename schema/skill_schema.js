
import Joi from "joi";

export const skillSchema = Joi.object({

    skillName: Joi.string().required(),
    levelOfProficiency: Joi.string().valid('25', '50', '75', '100').required(),
    user: Joi.string()

    });