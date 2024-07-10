
import Joi from "joi";

export const skillSchema = Joi.object({
    skills: Joi.object({

     name: Joi.string(),
    levelOfProficiency: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert').required(),
    user: Joi.string().required()

    })
});