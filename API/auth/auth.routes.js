
import { signin,signup,signout,deactivateAccount,deleteAccount } from "./auth.handlers.js";
import { Router } from "express";
import { signInValidatorMiddleware, signUpValidatorMiddleware } from "./auth.middlware.js";
// auth mini app
import dotenv from 'dotenv'
import { verifyJWT } from "../../middleware/token.js";
dotenv.config()
const authRouter=Router();


// 1. user registration and verification
authRouter.post('/signup',signUpValidatorMiddleware,signup)
authRouter.get('/verify-email?token')
authRouter.post('/resend-verification-email')



// 2.user login and session management
authRouter.post('/signin',signInValidatorMiddleware,signin)
authRouter.post('/signout',signout)
authRouter.post('/refresh-token')
// 3.password management
authRouter.post('/forgot-password')
authRouter.post('/reset-password?token=')
authRouter.post('/change-password')

// 4.Multi-Factor Authentication
authRouter.post('/mfa/enable')
authRouter.post('/mfa/verify')
authRouter.post('/mfa/disable')

// 5. Account Management
authRouter.post('/deactivate-account',verifyJWT,deactivateAccount)
authRouter.post('/delete-account',verifyJWT,deleteAccount)

// 6. third party authentication
// oauth login
authRouter.get('/oauth/:provider')
// oauth callback
authRouter.get('/oauth/:provider/callback')

// 7. security features

authRouter.get('/login-history')

authRouter.post('/whitelist-ip')
authRouter.delete('/whitelist-ip')

// api key management 
authRouter.post('auth/api-key')
authRouter.delete('/api-key')

authRouter.post('/captcha/enable')
authRouter.post('/captcha/disable')
authRouter.get('/notifications')
authRouter.put('/notifications')


export default  authRouter;