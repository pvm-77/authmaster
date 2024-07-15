


export const signin=async(req,res)=>{
    try {
        const {email,password}=req.body;
    } catch (error) {
        console.log(error);
        
    }

}

export const signup=async(req,res)=>{
    try {
        const {fullname,email,password}=req.body;
    } catch (error) {
        
    }
}


export const signout=async()=>{}