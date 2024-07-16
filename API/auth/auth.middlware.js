
import { signInValidationSchema,signUpValidationSchema } from "./auth.validation.js"




export const signUpValidatorMiddleware=async(req,res,next)=>{
    try {
        console.log('in signup middleware ')
        await signUpValidationSchema.validateAsync(req.body)
        next()
    } catch (error) {
        console.log('in signup middlware error');
        throw new Error(error)
        console.log(error)  
       
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
