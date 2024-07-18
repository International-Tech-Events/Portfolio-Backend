import Joi from "joi";

export const achievementSchema = Joi.object({
    awardName: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string(),
    date: Joi.string().required(),
    awardingInstitution: Joi.string().required(),
    user: Joi.string()
});





