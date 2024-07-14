




import joi from 'joi';
export const userSchema = joi.object({
  
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        otherNames: joi.string(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
        confirmedPassword: joi.ref('password'),
        userName: joi.string(),
        userName: joi.string().required(),
        termsAndConditions: joi.boolean(),

    })  .with('password', 'confirmedPassword');
















// import Joi from "joi";

// export const userSchema = Joi.object({
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         otherNmaes: Joi.string(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(4).required(),
//         confirmedPassword: Joi.ref('password'),
//         userName: Joi.string(),
//         termsAndCondition: Joi.boolean(),
//     }
// );



