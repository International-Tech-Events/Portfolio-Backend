
import Joi from "joi";

export const skillSchema = Joi.object({

    skillName: Joi.string().required(),
    levelOfProficiency: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').required(),
    user: Joi.string()

    });