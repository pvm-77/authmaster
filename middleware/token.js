


import jwt from 'jsonwebtoken'
import { fetchUserByCriteria } from '../API/users/user.js';
export const verifyJWT=async(req,res,next)=>{
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            res.status(401).json({message:'header is missing'}) 
        }
        const token=authHeader.split(' ')[1];
        console.log('the token is :',token)

        const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user=await fetchUserByCriteria({id:decodeToken.id})
        console.log('the user',user)

        // req.user=user
        next();
    } catch (error) {
        console.log('the error is in toke file is:',error)
    }
}



