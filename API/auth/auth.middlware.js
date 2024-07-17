
import { signInValidationSchema,signUpValidationSchema } from "./auth.validation.js"
export const signUpValidatorMiddleware=async(req,res,next)=>{
    try {
        console.log('in signup middleware ',req.body)
        await signUpValidationSchema.validateAsync(req.body)
        next()
    } catch (error) {
        console.log('in signup middlware error');
        console.log(error)  
        throw new Error(error)
        
       
        // next(error)  
    }
}

export const signInValidatorMiddleware=async(req,res,next)=>{
    console.log('in signup middleware');
    try {
        await signInValidationSchema.validateAsync(req.body)
        next()
    } catch (error) {
        console.log('in joi middleware error')
        next(error)
        
    }

}
