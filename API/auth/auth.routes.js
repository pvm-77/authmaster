
import { signin, signup, signout, deactivateAccount, deleteAccount } from "./auth.handlers.js";
import { Router } from "express";
import { signInValidatorMiddleware, signUpValidatorMiddleware } from "./auth.middlware.js";
// auth mini app
import dotenv from 'dotenv'
import { verifyJWT } from "../../middleware/token.js";
import axios from "axios";
import jwt from 'jsonwebtoken'
dotenv.config();
const authRouter = Router();


// 1. user registration and verification
authRouter.post('/signup', signUpValidatorMiddleware, signup)
authRouter.get('/verify-email?token')
authRouter.post('/resend-verification-email')



// 2.user login and session management
authRouter.post('/signin', signInValidatorMiddleware, signin)
authRouter.post('/signout', signout)
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
authRouter.post('/deactivate-account', verifyJWT, deactivateAccount)
authRouter.post('/delete-account', verifyJWT, deleteAccount)

// 6. third party authentication
const GITHUB_CLIENT_ID = 'Ov23li9M8MQ2cKxPdR3P'
const GITHUB_CLIENT_SECRET = 'f7eae17ab98b2182121ce8a9fcaaf4fb524c08d1'
const GITHUB_CALLBACK_URL = 'http://localhost:3000/api/auth/github/callback'


authRouter.get('/github', async (req, res) => {
    // STEP 1: Users are redirected to request their GitHub identity[github consent screen]
    const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_CALLBACK_URL}&scope=read:user user:email`;
    res.status(302).redirect(redirectUrl);
})

authRouter.get('/github/callback', async (req, res) => {
    //step2:  Users are redirected back to your site by GitHub
    const { code } = req.query;
    try {
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code,
        }, {
            headers: { 'Accept': 'application/json' }
        });

        const accessToken = tokenResponse.data.access_token;
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { 'Authorization': `token ${accessToken}` }
        });
        const token = jwt.sign(userResponse.data, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userData = userResponse.data;
        res.redirect(`http://localhost:3001/login?token=${token}&user=${JSON.stringify(userData)}`);
    } catch (error) {
        console.error('GitHub OAuth error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

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


export default authRouter;