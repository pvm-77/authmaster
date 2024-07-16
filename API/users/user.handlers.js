import { fetchAllUsers } from "./user.js"
export const getAllUsers=async(req,res)=>{
    try {
        const users=await fetchAllUsers()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
    }
}