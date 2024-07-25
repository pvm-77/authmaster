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
    console.log('the criterial in service :',criteria)
    try {
        const data=await User.find(criteria);
        console.log('the data by service',data)
        return data;
        
    } catch (error) {
        console.log(error)
        
    }
}


export const deleteUserById=async(id)=>{
    try {
        const user=await User.findByIdAndDelete(id);
        return user;
    } catch (error) {
        console.log(error);
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