// user servive here buddy or u can say business logic here


import User from "./user.model.js";

export const fetchAllUsers=async()=>{
    try {
        const data=await User.find({})
        return data;
    } catch (error) {
        
    }
}
