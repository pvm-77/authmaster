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


// service logic for third party social media login

const getGoogleAuthUrl = () => {
    return `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&scope=email profile`;
};

const getAccessToken = async (code) => {
    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_CALLBACK_URL,
            grant_type: 'authorization_code',
        });
        return response.data.access_token;
    } catch (error) {
        throw new Error('Failed to get access token from Google');
    }
};

const getUserInfo = async (accessToken) => {
    try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to get user info from Google');
    }
};

const generateJwtToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const findOrCreateUser = async (userInfo) => {
    const { id, email, name, picture } = userInfo;

    try {
        // Check if user already exists
        let user = await User.findOne({ googleId: id });

        if (!user) {
            // If not, create a new user
            user = new User({
                googleId: id,
                email,
                name,
                profilePicture: picture
            });

            await user.save();
        }

        return user;
    } catch (error) {
        throw new Error('Failed to find or create user');
    }
};
