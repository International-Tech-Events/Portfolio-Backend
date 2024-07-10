import Joi from "joi";

export const achievementSchema = Joi.object({
    achievement: Joi.object ({
        awards: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
        date: Joi.string(),
        nameOfInstitution: Joi.string(),
        user: Joi.string().required()
    })

    });




