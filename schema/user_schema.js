import Joi from "joi";

export const userSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        otherNames: Joi.string(),
        userName: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required(),
        confirmPassword: Joi.ref('password'),
        termsAndConditions: Joi.boolean()
        
    }) .with('password', 'confirmPassword');

