import { registerUser } from "./auth.js";

import {authenticateUser} from '../users/user.js'
export const signup=async(req,res)=>{
    try {
        const newUser=await registerUser(req.body)
        res.status(201).json(newUser);
    } catch (error) {
        
    }
}

export const signin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const foundUser = await authenticateUser(req.body);
        if (!foundUser) {
          return res.status(401).json({ 'message': 'Unauthorized user' })
      
        }
        const accessToken = jwt.sign({ id: foundUser.id, email: foundUser.email, username: foundUser.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
      
        // const refreshToken = jwt.sign({ id: foundUser.id, email: foundUser.email, name: foundUser.fullname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        // foundUser.refreshToken = refreshToken;
        // const result = await foundUser.save();
        // res.cookie('jwt', refreshToken, {httpOnly: true,secure: true, sameSite: 'None',maxAge: 24 * 60 * 60 * 1000});
        // res.status(200).json({ accessToken, });

        // generate token 
        // res.status(200).json()
    } catch (error) {
        console.log(error);
        
    }

}




export const signout=async()=>{}