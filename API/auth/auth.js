// it like service folder
import User from "../users/user.model.js"

export const registerUser=async(data)=>{
    console.log('the data in service:',data)
    try {
        const newUser=new User();
        newUser.fullname=data.fullname
        newUser.email=data.email
        newUser.password=data.password
        const response=await newUser.save()
        return response;

        
    } catch (error) {
        console.log(error)
    }

}
export const loginUser=async()=>{
    
}
