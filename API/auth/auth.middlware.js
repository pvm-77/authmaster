
import { signInValidationSchema,signUpValidationSchema } from "./auth.validation.js"

export const signInValidatorMiddleware=async(req,res,next)=>{
    try {

        await signInValidationSchema.validateAsync(req.body)
        next()
    } catch (error) {
        next(error)
        
    }





}
export const signUpValidatorMiddleware=()=>{}