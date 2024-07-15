
import Joi from "joi";

export const signUpValidationSchema = Joi.object({
    fullname: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

});

export const signInValidationSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),

});