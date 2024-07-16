import { registerUser } from "./auth.js";
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
    } catch (error) {
        console.log(error);
        
    }

}




export const signout=async()=>{}