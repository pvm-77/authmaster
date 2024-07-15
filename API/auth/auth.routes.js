
import { signin,signup,signout } from "./auth.handlers.js";
import { Router } from "express";
import { signInValidationSchema } from "./auth.validation.js";
import { signInValidatorMiddleware, signUpValidatorMiddleware } from "./auth.middlware.js";
// auth mini app
const authRouter=Router();


// 1. user registration and verification

authRouter.post('/auth/signup',signUpValidatorMiddleware,signup)
authRouter.get('/auth/verify-email?token')
authRouter.post('/auth/resend-verification-email')


// 2.user login and session management
authRouter.post('/auth/signin',signInValidatorMiddleware,signin)
authRouter.post('/auth/signout',signout)
authRouter.post('/auth/refresh-token')

// 3.password management
authRouter.post('/auth/forgot-password')
authRouter.post('/auth/reset-password?token=')
authRouter.post('/auth/change-password')

// 4.Multi-Factor Authentication
authRouter.post('/auth/mfa/enable')
authRouter.post('/auth/mfa/verify')
authRouter.post('/auth/mfa/disable')

// 5. Account Management
authRouter.post('/auth/deactivate-account')
authRouter.post('/auth/delete-account')

// 6. third party authentication
// oauth login
authRouter.get('/auth/oauth/:provider')
// oauth callback
authRouter.get('/auth/oauth/:provider/callback')

// 7. security features

authRouter.get('/auth/login-history')

authRouter.post('/auth/whitelist-ip')
authRouter.delete('/auth/whitelist-ip')

// api key management 
authRouter.post('auth/api-key')
authRouter.delete('/auth/api-key')

authRouter.post('/auth/captcha/enable')
authRouter.post('/auth/captcha/disable')
authRouter.get('/auth/notifications')
authRouter.put('/auth/notifications')


export default  authRouter;