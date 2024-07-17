// it like service folder
import User from "../users/user.model.js"
import {fetchUserByCriteria} from '../users/user.js'
export const registerUser=async(data)=>{
  
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

    const foundUser = await authenticateUser(req.body);
    if (!foundUser) {
      return res.status(401).json({ 'message': 'Unauthorized user' })
  
    }
    const accessToken = jwt.sign({ id: foundUser._id, email: foundUser.email, username: foundUser.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
  
    const refreshToken = jwt.sign({ id: foundUser._id, email: foundUser.email, username: foundUser.name }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    res.cookie('jwt', refreshToken, {httpOnly: true,secure: true, sameSite: 'None',maxAge: 24 * 60 * 60 * 1000});
    res.status(200).json({ accessToken, });
    
}
