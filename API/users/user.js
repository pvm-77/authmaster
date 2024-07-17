// user servive here buddy or u can say business logic here


import User from "./user.model.js";

export const fetchAllUsers=async()=>{
    try {
        const data=await User.find({})
        return data;
    } catch (error) {
        
    }
}


export const fetchUserByCriteria=async(criteria)=>{
    try {
        const data=await User.find({criteria})
        
    } catch (error) {
        
    }
}


export const isPasswordMatch=async()=>{

}

export const authenticateUser = async (signInData) => {
   
        try {
            
            const user = await User.findOne({ email: signInData.email });
          
            if (!user) {
                throw new Error(`Email ${signInData.email} not registered`);
            }
        
            const isPasswordMatch = await user.validatePassword(signInData.password);
            if (!isPasswordMatch) {
                throw new Error('Password does not match');
            }
            return user;  
        } catch (error) {
            // Pass the error to the calling function
            throw new Error(error.message);
        }


}