import { registerUser } from "./auth.js";
import jwt from 'jsonwebtoken'
import {authenticateUser,deleteUserById,fetchUserByCriteria} from '../users/user.js';
import dotenv from 'dotenv'
dotenv.config()
export const signup=async(req,res)=>{
    try {
        const newUser=await registerUser(req.body)
        res.status(201).json(newUser);
    } catch (error) {
        
    }
}

export const signin=async(req,res)=>{
    try {
        const foundUser = await authenticateUser(req.body);
        if (!foundUser) {
          return res.status(401).json({ 'message': 'Unauthorized user' });
        }
        const accessToken = jwt.sign({ id: foundUser.id, email: foundUser.email, username: foundUser.fullname}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ id: foundUser.id, email: foundUser.email, name: foundUser.fullname }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        res.cookie('jwt', refreshToken, {httpOnly: true,secure: true, sameSite: 'None',maxAge: 24 * 60 * 60 * 1000});
        res.status(200).json({ accessToken,username:foundUser.fullname,email:foundUser.email });
    } catch (error) {
        console.log(error);
        
    }

}
export const signout=async()=>{}


export const deactivateAccount=async(req,res)=>{
    try {
        const userId=req.user.id;
        const findUser=await fetchUserByCriteria(userId);
        if (!findUser) {
            res.status(404).json({message:`user with ${userId} not found`});   
        }
        findUser.isActive=false;
        await findUser.save();
        res.status(200).json({message:'successfully deactivate user'});

    } catch (error) {
        console.log(error);
        
    }
}

export const deleteAccount=async(req,res)=>{
    try {
        userId=req.user.id;
        const findUser=await deleteUserById(userId)
        res.status(204).json({})
        
    } catch (error) {
        
    }
}