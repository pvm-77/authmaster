
import Joi from "joi";

export const signUpValidationSchema = Joi.object({
    // fullname: Joi.string().alphanum().min(3).max(30).required(),
    fullname: Joi.string().regex(/^[a-zA-Z\s]*$/).min(3).max(30).required().messages({
        'string.pattern.base': 'Full name must only contain letters and spaces',
        'any.required': 'Full name is required',
        'string.min': 'Full name must be at least {#limit} characters long',
        'string.max': 'Full name must be at most {#limit} characters long'
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),

});

export const signInValidationSchema=Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),

});